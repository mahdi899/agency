<?php

namespace App\Http\Controllers\Api;

use App\Models\Portfolio;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index(Request $request)
    {
        $query = Portfolio::query();

        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        if ($request->has('featured')) {
            $query->featured();
        }
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $portfolios = $query->active()->orderBy('order')->get();

        return response()->json(['success' => true, 'data' => PortfolioResource::collection($portfolios)]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'type' => 'nullable|string',
            'thumbnail' => 'required|file|mimes:jpg,jpeg,png,webp|max:2048',
            'video_url' => 'nullable|string',
            'gallery' => 'nullable|array',
            'client_name' => 'nullable|string',
            'industry' => 'nullable|string',
            'views' => 'nullable|string',
            'growth' => 'nullable|string',
            'tags' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/portfolios", $filename, 'public');
            $validated['thumbnail'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }
        
        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/portfolios", $filename, 'public');
                $gallery[] = Storage::disk('public')->url(str_replace('public/', '', $path));
            }
            $validated['gallery'] = json_encode($gallery);
        }
        
        $portfolio = Portfolio::create($validated);

        return response()->json(['success' => true, 'message' => 'نمونه کار ایجاد شد.', 'data' => new PortfolioResource($portfolio)], 201);
    }

    public function show(Portfolio $portfolio)
    {
        return response()->json(['success' => true, 'data' => new PortfolioResource($portfolio)]);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'type' => 'nullable|string',
            'thumbnail' => 'sometimes|file|mimes:jpg,jpeg,png,webp|max:2048',
            'video_url' => 'nullable|string',
            'gallery' => 'nullable|array',
            'client_name' => 'nullable|string',
            'industry' => 'nullable|string',
            'views' => 'nullable|string',
            'growth' => 'nullable|string',
            'tags' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }
        
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/portfolios", $filename, 'public');
            $validated['thumbnail'] = Storage::disk('public')->url(str_replace('public/', '', $path));
        }
        
        // Handle gallery uploads
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $index => $file) {
                $filename = time() . '_' . $index . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                            . '.' . $file->getClientOriginalExtension();
                
                $path = $file->storeAs("public/portfolios", $filename, 'public');
                $gallery[] = Storage::disk('public')->url(str_replace('public/', '', $path));
            }
            $validated['gallery'] = json_encode($gallery);
        }

        $portfolio->update($validated);
        return response()->json(['success' => true, 'message' => 'نمونه کار بروزرسانی شد.', 'data' => new PortfolioResource($portfolio)]);
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->json(['success' => true, 'message' => 'نمونه کار حذف شد.']);
    }
}
