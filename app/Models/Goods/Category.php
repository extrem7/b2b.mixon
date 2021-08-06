<?php

namespace App\Models\Goods;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    protected $table = 'goods_categories';

    protected $fillable = ['group_id', 'name', 'number'];

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}