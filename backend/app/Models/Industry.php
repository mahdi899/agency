<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Industry extends Model
{
    protected $fillable = [
        'title', 'slug', 'short_title', 'description', 'full_description',
        'icon', 'color', 'image', 'hero_image', 'services', 'results',
        'case_study', 'testimonial', 'seo_keywords', 'order', 'is_active'
    ];

    protected $casts = [
        'services' => 'array',
        'results' => 'array',
        'case_study' => 'array',
        'testimonial' => 'array',
        'seo_keywords' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
