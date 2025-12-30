<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogImage extends Model
{
    protected $fillable = [
        'blog_post_id', 'url', 'alt_text', 'title', 'caption',
        'width', 'height', 'file_size', 'mime_type', 'order'
    ];

    public function post()
    {
        return $this->belongsTo(BlogPost::class, 'blog_post_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }
}
