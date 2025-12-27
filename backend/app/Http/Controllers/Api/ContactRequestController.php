<?php

namespace App\Http\Controllers\Api;

use App\Models\ContactRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactRequest::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $contacts = $query->latest()->paginate(20);

        return response()->json(['success' => true, 'data' => $contacts]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'company' => 'nullable|string',
            'subject' => 'required|string',
            'message' => 'required|string',
            'service' => 'nullable|string',
            'budget' => 'nullable|string',
        ]);

        $contact = ContactRequest::create($validated);

        return response()->json(['success' => true, 'message' => 'پیام شما ارسال شد.', 'data' => $contact], 201);
    }

    public function show(ContactRequest $contactRequest)
    {
        $contactRequest->markAsRead();
        return response()->json(['success' => true, 'data' => $contactRequest]);
    }

    public function update(Request $request, ContactRequest $contactRequest)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:new,read,replied,closed',
            'admin_notes' => 'nullable|string',
        ]);

        $contactRequest->update($validated);
        return response()->json(['success' => true, 'message' => 'درخواست بروزرسانی شد.', 'data' => $contactRequest]);
    }

    public function destroy(ContactRequest $contactRequest)
    {
        $contactRequest->delete();
        return response()->json(['success' => true, 'message' => 'درخواست حذف شد.']);
    }

    public function markAsRead(ContactRequest $contactRequest)
    {
        $contactRequest->markAsRead();
        return response()->json(['success' => true, 'message' => 'به عنوان خوانده شده علامت‌گذاری شد.']);
    }
}
