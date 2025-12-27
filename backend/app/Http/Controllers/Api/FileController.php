<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
            'folder' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $folder = $request->input('folder', 'uploads');
        
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                    . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs("public/{$folder}", $filename);
        
        return response()->json([
            'success' => true,
            'path' => Storage::url($path),
            'filename' => $filename,
        ]);
    }

    public function list(Request $request)
    {
        $folder = $request->input('folder', 'uploads');
        $files = Storage::files("public/{$folder}");
        
        $fileList = collect($files)->map(function ($file) {
            return [
                'name' => basename($file),
                'path' => Storage::url($file),
                'size' => Storage::size($file),
                'modified' => Storage::lastModified($file),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $fileList,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate(['path' => 'required|string']);
        
        $path = str_replace('/storage/', 'public/', $request->input('path'));
        
        if (Storage::exists($path)) {
            Storage::delete($path);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'فایل یافت نشد'], 404);
    }

    public function uploadVideo(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:mp4,mov,avi,wmv,webm|max:102400', // 100MB max
            'folder' => 'nullable|string',
            'type' => 'nullable|string|in:vertical,horizontal',
        ]);

        $file = $request->file('file');
        $folder = $request->input('folder', 'videos');
        $type = $request->input('type', 'vertical');
        
        $subfolder = $type === 'vertical' ? 'reels' : 'horizontal';
        
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                    . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs("public/{$folder}/{$subfolder}", $filename);
        
        return response()->json([
            'success' => true,
            'path' => Storage::url($path),
            'filename' => $filename,
            'type' => $type,
        ]);
    }
}
