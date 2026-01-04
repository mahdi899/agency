<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IndustryResource extends JsonResource
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

        $heroImageUrl = null;
        if ($this->hero_image) {
            // 1. If it's already a full URL, leave it alone
            if (str_contains($this->hero_image, 'http')) {
                $heroImageUrl = $this->hero_image;
            } else {
                // 2. Remove prefixes AND leading slashes
                $cleanPath = ltrim(str_replace(['public/', 'storage/'], '', $this->hero_image), '/');
                // 3. Generate correct absolute URL
                $heroImageUrl = asset('storage/' . $cleanPath);
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'short_title' => $this->short_title,
            'description' => $this->description,
            'full_description' => $this->full_description,
            'icon' => $this->icon,
            'color' => $this->color,
            'image' => $imageUrl,
            'hero_image' => $heroImageUrl,
            'services' => $this->services ? (is_string($this->services) ? json_decode($this->services, true) : $this->services) : [],
            'results' => $this->results ? (is_string($this->results) ? json_decode($this->results, true) : $this->results) : [],
            'case_study' => $this->case_study ? (is_string($this->case_study) ? json_decode($this->case_study, true) : $this->case_study) : [],
            'testimonial' => $this->testimonial ? (is_string($this->testimonial) ? json_decode($this->testimonial, true) : $this->testimonial) : [],
            'seo_keywords' => $this->seo_keywords ? (is_string($this->seo_keywords) ? json_decode($this->seo_keywords, true) : $this->seo_keywords) : [],
            'order' => $this->order,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}