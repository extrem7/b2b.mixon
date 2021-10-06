<?php

namespace Modules\Account\Http\Controllers\Order;

use App\Models\Department;
use App\Models\Order;
use Inertia\Response as InertiaResponse;
use Modules\Account\Http\Controllers\Controller;
use Modules\Account\Http\Requests\IndexRequest;
use Modules\Account\Http\Resources\OrderCollection;

final class HistoryController extends Controller
{
    public function index(IndexRequest $request): InertiaResponse
    {
        $this->seo()->setTitle('История заказов');

        $paginationCount = 20;

        $user = \Auth::user();
        $orders = $user->orders()->with('user')->withCount('goods')->orderByDesc('id')->paginate($paginationCount);

        if ($user->hasRole('admin')) {
            $orders = Order::with('user')->withCount('goods')->orderByDesc('id')->paginate($paginationCount);
        } else if ($department = $this->getDepartment()) {
            $orders = Order::with('user')
                ->whereHas('user', fn($q) => $q->whereHas('departments', fn($d) => $d->where('id', $department->id)))
                ->withCount('goods')
                ->orderByDesc('id')
                ->paginate($paginationCount);
        }

        return inertia('Order/History', [
            'data' => [
                'paginator' => (new OrderCollection($orders))->toArray(),
                'table' => array_merge($request->only(['searchQuery', 'sortBy',]), [
                    'sortDesc' => (int)$request->input('sortDesc')
                ]),
            ]
        ]);
    }

    public function show(Order $order): InertiaResponse
    {
        $this->seo()->setTitle("Заказ {$order->id}");

        $user = \Auth::user();

        abort_unless($order->user_id === $user->id || $user->hasRole(['admin', 'manager']), 403);

        $order->load(['user', 'goods']);
        $order->billing = Order::$billing[$order->billing];
        $order->type = Order::$types[$order->type];

        return inertia('Order/Show', ['data' => ['order' => $order]]);
    }

    private function getDepartment(): Department
    {
        return \Auth::user()->departments()->first();
    }
}
