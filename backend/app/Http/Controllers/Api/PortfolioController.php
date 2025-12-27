<?php

namespace App\Http\Controllers\Api;

use App\Models\Portfolio;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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

        return response()->json(['success' => true, 'data' => $portfolios]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'type' => 'nullable|string',
            'thumbnail' => 'required|string',
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
        $portfolio = Portfolio::create($validated);

        return response()->json(['success' => true, 'message' => 'نمونه کار ایجاد شد.', 'data' => $portfolio], 201);
    }

    public function show(Portfolio $portfolio)
    {
        return response()->json(['success' => true, 'data' => $portfolio]);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'type' => 'nullable|string',
            'thumbnail' => 'sometimes|string',
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

        $portfolio->update($validated);
        return response()->json(['success' => true, 'message' => 'نمونه کار بروزرسانی شد.', 'data' => $portfolio]);
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();
        return response()->json(['success' => true, 'message' => 'نمونه کار حذف شد.']);
    }
}
