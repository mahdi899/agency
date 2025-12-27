<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function index(Request $request)
    {
        $group = $request->input('group');
        
        if ($group) {
            $settings = SiteSetting::getByGroup($group);
        } else {
            $settings = SiteSetting::all()->mapWithKeys(function ($item) {
                $value = $item->type === 'json' ? json_decode($item->value, true) : $item->value;
                return [$item->key => $value];
            });
        }

        return response()->json(['success' => true, 'data' => $settings]);
    }

    public function show($key)
    {
        $setting = SiteSetting::where('key', $key)->first();
        
        if (!$setting) {
            return response()->json(['success' => false, 'message' => 'تنظیم یافت نشد'], 404);
        }

        $value = $setting->type === 'json' ? json_decode($setting->value, true) : $setting->value;

        return response()->json(['success' => true, 'data' => ['key' => $key, 'value' => $value, 'type' => $setting->type]]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|unique:site_settings,key',
            'value' => 'required',
            'type' => 'nullable|string|in:text,json,image,video',
            'group' => 'nullable|string',
        ]);

        $type = $validated['type'] ?? 'text';
        $group = $validated['group'] ?? 'general';
        $value = $validated['value'];

        if ($type === 'json' && is_array($value)) {
            $value = json_encode($value);
        }

        $setting = SiteSetting::create([
            'key' => $validated['key'],
            'value' => $value,
            'type' => $type,
            'group' => $group,
        ]);

        return response()->json(['success' => true, 'message' => 'تنظیم ایجاد شد', 'data' => $setting], 201);
    }

    public function update(Request $request, $key)
    {
        $setting = SiteSetting::where('key', $key)->first();
        
        if (!$setting) {
            return response()->json(['success' => false, 'message' => 'تنظیم یافت نشد'], 404);
        }

        $validated = $request->validate([
            'value' => 'required',
            'type' => 'nullable|string|in:text,json,image,video',
            'group' => 'nullable|string',
        ]);

        $value = $validated['value'];
        $type = $validated['type'] ?? $setting->type;

        if ($type === 'json' && is_array($value)) {
            $value = json_encode($value);
        }

        $setting->update([
            'value' => $value,
            'type' => $type,
            'group' => $validated['group'] ?? $setting->group,
        ]);

        return response()->json(['success' => true, 'message' => 'تنظیم بروزرسانی شد', 'data' => $setting]);
    }

    public function bulkUpdate(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'required',
            'settings.*.type' => 'nullable|string',
            'settings.*.group' => 'nullable|string',
        ]);

        foreach ($validated['settings'] as $item) {
            SiteSetting::set(
                $item['key'],
                $item['value'],
                $item['type'] ?? 'text',
                $item['group'] ?? 'general'
            );
        }

        return response()->json(['success' => true, 'message' => 'تنظیمات بروزرسانی شد']);
    }

    public function destroy($key)
    {
        $setting = SiteSetting::where('key', $key)->first();
        
        if (!$setting) {
            return response()->json(['success' => false, 'message' => 'تنظیم یافت نشد'], 404);
        }

        $setting->delete();

        return response()->json(['success' => true, 'message' => 'تنظیم حذف شد']);
    }
}
