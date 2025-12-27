<?php

namespace App\Http\Controllers\Api;

use App\Models\Package;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = Package::where('is_active', true)->get();
        return response()->json(['success' => true, 'data' => $packages]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
        ]);
        $package = Package::create($validated);
        return response()->json(['success' => true, 'data' => $package], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        return response()->json(['success' => true, 'data' => $package]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Package $package)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
        ]);
        $package->update($validated);
        return response()->json(['success' => true, 'data' => $package]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        $package->delete();
        return response()->json(['success' => true]);
    }
}
