<?php

namespace App\Http\Controllers\Api;

use App\Models\Industry;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IndustryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $industries = Industry::where('is_active', true)->get();
        return response()->json(['success' => true, 'data' => $industries]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:industries',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $industry = Industry::create($validated);
        return response()->json(['success' => true, 'data' => $industry], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Industry $industry)
    {
        return response()->json(['success' => true, 'data' => $industry]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Industry $industry)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'string|unique:industries,slug,' . $industry->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $industry->update($validated);
        return response()->json(['success' => true, 'data' => $industry]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Industry $industry)
    {
        $industry->delete();
        return response()->json(['success' => true]);
    }
}
