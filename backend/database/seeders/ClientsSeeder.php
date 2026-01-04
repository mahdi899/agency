<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientsSeeder extends Seeder
{
    public function run(): void
    {
        $clients = [
            [
                'id' => 1,
                'name' => 'کافه لمیز',
                'logo' => '/storage/clients/cafe-lamiz.jpg',
                'icon' => 'Coffee',
                'color' => 'from-amber-500 to-orange-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 2,
                'name' => 'کلینیک رز',
                'logo' => '/storage/clients/clinic-rose.jpg',
                'icon' => 'Stethoscope',
                'color' => 'from-pink-500 to-rose-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 3,
                'name' => 'فروشگاه آریا',
                'logo' => '/storage/clients/fashion-aria.jpg',
                'icon' => 'ShoppingBag',
                'color' => 'from-purple-500 to-violet-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 4,
                'name' => 'نمایشگاه پرشیا',
                'logo' => '/storage/clients/auto-persia.jpg',
                'icon' => 'Car',
                'color' => 'from-blue-500 to-cyan-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 5,
                'name' => 'دیجی‌استایل',
                'logo' => '/storage/clients/digi-style.jpg',
                'icon' => 'Shirt',
                'color' => 'from-fuchsia-500 to-pink-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 6,
                'name' => 'باشگاه فیت‌لند',
                'logo' => '/storage/clients/fitland.jpg',
                'icon' => 'Dumbbell',
                'color' => 'from-green-500 to-emerald-500',
                'website' => '#',
                'industry' => null,
                'order' => 0,
                'is_active' => 1,
            ],
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
