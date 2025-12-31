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
            'thumbnail' => $this->thumbnail ? asset('storage/' . $this->thumbnail) : null,
            'video_url' => $this->video_url,
            'gallery' => $this->gallery ? (is_string($this->gallery) ? json_decode($this->gallery, true) : $this->gallery) : [],
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
}
