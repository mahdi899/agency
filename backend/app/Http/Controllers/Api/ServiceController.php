<?php

namespace App\Http\Controllers\Api;

use App\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('active')) {
            $query->active();
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        $services = $query->orderBy('order')->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'short_title' => 'nullable|string|max:100',
            'full_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'process' => 'nullable|array',
            'gallery' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت ایجاد شد.',
            'data' => $service,
        ], 201);
    }

    public function show(Service $service)
    {
        return response()->json([
            'success' => true,
            'data' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'short_title' => 'nullable|string|max:100',
            'full_description' => 'nullable|string',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
            'image' => 'nullable|string',
            'features' => 'nullable|array',
            'process' => 'nullable|array',
            'gallery' => 'nullable|array',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت بروزرسانی شد.',
            'data' => $service,
        ]);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'سرویس با موفقیت حذف شد.',
        ]);
    }
}
