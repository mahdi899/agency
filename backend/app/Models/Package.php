<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'name', 'slug', 'subtitle', 'price', 'period', 'description', 'color',
        'features', 'not_included', 'is_popular', 'is_active', 'order'
    ];

    protected $casts = [
        'features' => 'array',
        'not_included' => 'array',
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }
}
