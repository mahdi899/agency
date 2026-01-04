<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = null;
        if ($this->image) {
            // 1. If it's already a full URL, leave it alone
            if (str_contains($this->image, 'http')) {
                $imageUrl = $this->image;
            } else {
                // 2. Remove prefixes AND leading slashes
                $cleanPath = ltrim(str_replace(['public/', 'storage/'], '', $this->image), '/');
                // 3. Generate correct absolute URL
                $imageUrl = asset('storage/' . $cleanPath);
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_title' => $this->short_title,
            'full_description' => $this->full_description,
            'icon' => $this->icon,
            'color' => $this->color,
            'image' => $imageUrl,
            'features' => $this->features ? (is_string($this->features) ? json_decode($this->features, true) : $this->features) : [],
            'process' => $this->process ? (is_string($this->process) ? json_decode($this->process, true) : $this->process) : [],
            'gallery' => $this->gallery ? $this->processGalleryUrls($this->gallery) : [],
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
            'is_featured' => (bool) $this->is_featured,
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
            if (!$image) {
                return null;
            }
            
            if (str_contains($image, 'http')) {
                return $image;
            }
            
            return asset('storage/' . ltrim(str_replace(['public/', 'storage/'], '', $image), '/'));
        }, $galleryArray);
    }
}
