<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ServicesSeeder::class,
            IndustriesSeeder::class,
            ClientsSeeder::class,
            PackagesSeeder::class,
            TestimonialsSeeder::class,
            BlogCategoriesSeeder::class,
            BlogTagsSeeder::class,
            BlogPostsSeeder::class,
            BlogImagesSeeder::class,
            PortfoliosSeeder::class,
            ReelsSeeder::class,
            TeamMembersSeeder::class,
            WebProjectsSeeder::class,
            HomeCardsSeeder::class,
            SiteSettingsSeeder::class,
        ]);
    }
}
