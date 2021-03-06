<?php

namespace Modules\Account\Http\Controllers\Users;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Modules\Account\Http\Controllers\Controller;
use Modules\Account\Http\Requests\IndexRequest;
use Modules\Account\Http\Requests\UserRequest;
use Modules\Account\Http\Resources\UserCollection;
use Modules\Account\Repositories\UserRepository;

class UserController extends Controller
{
    protected UserRepository $repository;

    public function __construct()
    {
        $this->repository = app(UserRepository::class);

        $this->middleware('can:users.create')->only(['create', 'store']);
        $this->middleware('can:users.edit')->only(['edit', 'update']);
        $this->middleware('can:users.delete')->only('destroy');
        $this->middleware('can:users.trash')->only('trash');
        $this->middleware('can:users.restore')->only('restore');
        $this->middleware('can:users.force-delete')->only('forceDestroy');
    }

    public function index(IndexRequest $request): Response
    {
        $title = 'Пользователи' . $this->appendPageToTitle($request);

        $this->seo()->setTitle($title);

        $users = $this->repository->getUsersForIndex($request->validated());

        return inertia('Users/Index', [
            'data' => [
                'paginator' => (new UserCollection($users))->toArray(),
                'table' => array_merge($request->only(['searchQuery', 'sortBy',]), [
                    'sortDesc' => (int)$request->input('sortDesc')
                ]),
            ],
        ]);
    }

    public function create(): Response
    {
        $this->seo()->setTitle('Создать пользователя');

        return inertia('Users/Profile', ['data' => [
            'shippingPoints' => $this->repository->getShippingPoints(),
            'saleTypes' => User::$saleTypes,
            'roles' => $this->repository->getRoles(),
            'categories' => $this->repository->getCategories()
        ]]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $data = $request->except('password');
        $data['shipping_point'] = $data['shippingPoint'];
        $password = \Hash::make($request->input('password'));

        $user = User::create(array_merge($data, compact('password')));

        if ($roles = $request->input('roles')) {
            $user->assignRole($roles);
        } else {
            $user->assignRole('user');
        }

        $user->markEmailAsVerified();

        if ($avatar = $request->file('avatar')) {
            $user->uploadAvatar($avatar);
        }

        $user->availableCategories()->sync($request->input('categories'));
        if ($request->filled('sales')) {
            $sales = array_filter($request->input('sales'), fn($s) => $s);

            foreach ($sales as $categoryId => $sale) {
                $sales[$categoryId] = ['size' => $sale];
            }

            $user->sales()->sync($sales);
        }

        return redirect()->route('account.users.edit', $user->id)->with([
            'toast' => [
                'text' => "Пользователь {$user->full_name} был создан."
            ]
        ]);
    }

    public function edit(int $id): Response
    {
        $user = $this->repository->findById($id);

        $this->seo()->setTitle('Редактировать пользователя');

        $data = $user->only([
            'id', 'name', 'surname', 'email',
            'company', 'okpo', 'country', 'city', 'address', 'fax', 'phone',
            'shipping_point', 'sale_type'
        ]);
        $data['shippingPoint'] = $data['shipping_point'];
        $data['saleType'] = $data['sale_type'];
        $data['roles'] = $user->roles->pluck('id');
        $data['categories'] = $user->availableCategories->pluck('id');
        $sales = [];

        foreach ($user->sales as $sale) {
            $sales[$sale->id] = $sale->pivot->size;
        }
        $data['sales'] = $sales;

        if ($user->avatarMedia) {
            $data['avatar'] = $user->getAvatar();
        }

        return inertia('Users/Profile', [
            'data' => [
                'user' => $data,
                'shippingPoints' => $this->repository->getShippingPoints(),
                'saleTypes' => User::$saleTypes,
                'roles' => $this->repository->getRoles(),
                'categories' => $this->repository->getCategories()
            ]
        ]);
    }

    public function update(UserRequest $request, int $id): RedirectResponse
    {
        $user = $this->repository->findById($id);

        $data = $request->except('password');
        $data['shipping_point'] = $data['shippingPoint'];
        $data['sale_type'] = $data['saleType'];

        if ($password = $request->input('password')) {
            $data['password'] = \Hash::make($password);
        }

        $user->update($data);

        if ($request->filled('roles')) {
            $user->syncRoles($request->input('roles'));
        }
        if ($request->filled('categories')) {
            $user->availableCategories()->sync($request->input('categories'));
        }
        if ($request->filled('sales')) {
            $sales = array_filter($request->input('sales'), fn($s) => $s);

            foreach ($sales as $categoryId => $sale) {
                $sales[$categoryId] = ['size' => $sale];
            }

            $user->sales()->sync($sales);
        }

        if ($avatar = $request->file('avatar')) {
            $user->uploadAvatar($avatar);
        }

        return back()->with(['toast' => ['text' => "Пользователь {$user->full_name} был отредактирован."]]);
    }

    public function destroy(int $id): RedirectResponse
    {
        $user = $this->repository->findById($id);

        if ($user->hasRole('admin')) {
            return back()->with(['flash' => ['text' => 'Ты в своем уме?', 'icon' => 'error']]);
        }

        try {
            $user->delete();
        } catch (\Exception) {
            return back()->with(['error' => 'Возникла ошибка при удалении пользователя.']);
        }

        return back()->with(['toast' => ['text' => 'Пользователь был удален.']]);
    }

    public function trash(IndexRequest $request): Response
    {
        $title = 'Удаленные пользователи' . $this->appendPageToTitle($request);

        $this->seo()->setTitle($title);

        /* @var $q SoftDeletes */
        $users = $this->repository->getUsersForIndex(
            $request->validated(), fn(Builder $q) => $q->onlyTrashed()
        );

        return inertia('Users/Index', [
            'data' => [
                'paginator' => (new UserCollection($users))->toArray(),
                'table' => array_merge($request->only(['searchQuery', 'sortBy',]), [
                    'sortDesc' => (int)$request->input('sortDesc')
                ]),
            ]
        ]);
    }

    public function restore(int $id): RedirectResponse
    {
        $user = $this->repository->findById($id);
        if ($user->trashed()) {
            $user->restore();
        }
        return back()->with(['toast' => ['text' => "Пользователь $user->full_name был восстановлен."]]);
    }

    public function forceDestroy(int $id): RedirectResponse
    {
        $user = $this->repository->findById($id);
        if ($user->trashed()) {
            $user->forceDelete();
        }
        return back()->with(['toast' => ['text' => 'Пользователь был удален окончательно.']]);
    }

    public function destroyAvatar(int $id): RedirectResponse
    {
        $user = $this->repository->findById($id);

        $user->deleteAvatar();
        $user->load('avatarMedia');

        return redirect()->back()->with(['toast' => ['text' => 'Фото было удалено.']]);
    }
}
