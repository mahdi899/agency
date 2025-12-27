<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'full_description', 'category', 'type',
        'thumbnail', 'cover_image', 'video_url', 'gallery', 'client', 'industry',
        'views', 'growth', 'services', 'tags', 'duration', 'year', 'results',
        'testimonial', 'is_featured', 'is_active', 'order'
    ];

    protected $casts = [
        'gallery' => 'array',
        'tags' => 'array',
        'services' => 'array',
        'results' => 'array',
        'testimonial' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
