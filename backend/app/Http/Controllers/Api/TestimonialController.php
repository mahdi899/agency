<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::where('is_active', true)->get();
        return response()->json(['success' => true, 'data' => $testimonials]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author' => 'required|string|max:255',
            'role' => 'nullable|string',
            'company' => 'nullable|string',
            'content' => 'required|string',
            'avatar' => 'nullable|string',
            'rating' => 'integer|min:1|max:5',
            'is_active' => 'boolean',
        ]);
        $testimonial = Testimonial::create($validated);
        return response()->json(['success' => true, 'data' => $testimonial], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        return response()->json(['success' => true, 'data' => $testimonial]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'author' => 'string|max:255',
            'role' => 'nullable|string',
            'company' => 'nullable|string',
            'content' => 'string',
            'avatar' => 'nullable|string',
            'rating' => 'integer|min:1|max:5',
            'is_active' => 'boolean',
        ]);
        $testimonial->update($validated);
        return response()->json(['success' => true, 'data' => $testimonial]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(['success' => true]);
    }
}
