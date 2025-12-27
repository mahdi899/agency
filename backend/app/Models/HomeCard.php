<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeCard extends Model
{
    protected $fillable = [
        'title', 'description', 'image', 'icon', 'color',
        'link', 'section', 'value', 'suffix', 'order', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeBySection($query, $section)
    {
        return $query->where('section', $section);
    }
}
