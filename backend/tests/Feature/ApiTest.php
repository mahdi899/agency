<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin user for testing
        User::create([
            'name' => 'Admin',
            'email' => 'admin@agency.ir',
            'password' => bcrypt('admin123'),
        ]);
    }

    /**
     * A basic feature test example.
     */
    public function test_login_api(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'admin@agency.ir',
            'password' => 'admin123',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
        ]);
    }
}
