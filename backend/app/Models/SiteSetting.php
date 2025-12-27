<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'group'];

    protected $casts = [
        'value' => 'string',
    ];

    public static function get($key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) return $default;
        
        if ($setting->type === 'json') {
            return json_decode($setting->value, true);
        }
        return $setting->value;
    }

    public static function set($key, $value, $type = 'text', $group = 'general')
    {
        if ($type === 'json' && is_array($value)) {
            $value = json_encode($value);
        }

        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'type' => $type, 'group' => $group]
        );
    }

    public static function getByGroup($group)
    {
        return static::where('group', $group)->get()->mapWithKeys(function ($item) {
            $value = $item->type === 'json' ? json_decode($item->value, true) : $item->value;
            return [$item->key => $value];
        });
    }
}
