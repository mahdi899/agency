<?php

namespace App\Http\Controllers\Api;

use App\Models\Client;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::where('is_active', true)->get();
        return response()->json(['success' => true, 'data' => $clients]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'industry' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $client = Client::create($validated);
        return response()->json(['success' => true, 'data' => $client], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return response()->json(['success' => true, 'data' => $client]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|string',
            'industry' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        $client->update($validated);
        return response()->json(['success' => true, 'data' => $client]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['success' => true]);
    }
}
