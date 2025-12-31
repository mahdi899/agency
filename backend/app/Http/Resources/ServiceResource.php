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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'short_title' => $this->short_title,
            'full_description' => $this->full_description,
            'icon' => $this->icon,
            'color' => $this->color,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'features' => $this->features ? (is_string($this->features) ? json_decode($this->features, true) : $this->features) : [],
            'process' => $this->process ? (is_string($this->process) ? json_decode($this->process, true) : $this->process) : [],
            'gallery' => $this->gallery ? (is_string($this->gallery) ? json_decode($this->gallery, true) : $this->gallery) : [],
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
            'is_featured' => (bool) $this->is_featured,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
