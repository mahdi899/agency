<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title', 'slug', 'short_title', 'description', 'full_description',
        'icon', 'color', 'image', 'features', 'process', 'gallery',
        'order', 'is_active', 'is_featured'
    ];

    protected $casts = [
        'features' => 'array',
        'process' => 'array',
        'gallery' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
