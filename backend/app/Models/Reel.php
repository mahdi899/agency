<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reel extends Model
{
    protected $fillable = [
        'title', 'thumbnail', 'video_url', 'video_type',
        'views', 'likes', 'comments', 'gradient', 'order', 'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeVertical($query)
    {
        return $query->where('video_type', 'vertical');
    }

    public function scopeHorizontal($query)
    {
        return $query->where('video_type', 'horizontal');
    }
}
