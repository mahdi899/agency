<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Auto-sync storage files to public storage for Windows compatibility
        $this->syncStorageFiles();
    }
    
    private function syncStorageFiles()
    {
        $storagePath = storage_path('app/public');
        $publicPath = public_path('storage');
        
        if (!file_exists($publicPath)) {
            mkdir($publicPath, 0755, true);
        }
        
        $this->copyDirectory($storagePath, $publicPath);
    }
    
    private function copyDirectory($source, $destination)
    {
        if (!is_dir($source)) {
            return;
        }
        
        if (!is_dir($destination)) {
            mkdir($destination, 0755, true);
        }
        
        $files = scandir($source);
        foreach (array_diff($files, ['.', '..']) as $file) {
            $sourcePath = $source . '/' . $file;
            $destinationPath = $destination . '/' . $file;
            
            if (is_dir($sourcePath)) {
                $this->copyDirectory($sourcePath, $destinationPath);
            } else {
                copy($sourcePath, $destinationPath);
            }
        }
    }
}
