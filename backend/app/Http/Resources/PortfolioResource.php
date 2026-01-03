<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => $this->category,
            'type' => $this->type,
            'thumbnail' => $this->thumbnail ? asset($this->thumbnail) : null,
            'video_url' => $this->video_url,
            'gallery' => $this->gallery ? $this->processGalleryUrls($this->gallery) : [],
            'client_name' => $this->client_name,
            'industry' => $this->industry,
            'views' => $this->views,
            'growth' => $this->growth,
            'tags' => $this->tags ? (is_string($this->tags) ? json_decode($this->tags, true) : $this->tags) : [],
            'is_featured' => (bool) $this->is_featured,
            'is_active' => (bool) $this->is_active,
            'order' => $this->order,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }

    /**
     * Process gallery URLs to ensure absolute paths
     */
    protected function processGalleryUrls($gallery): array
    {
        $galleryArray = is_string($gallery) ? json_decode($gallery, true) : $gallery;
        
        if (!is_array($galleryArray)) {
            return [];
        }
        
        return array_map(function ($image) {
            return $image ? asset($image) : null;
        }, $galleryArray);
    }
}
