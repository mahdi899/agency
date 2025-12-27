<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Portfolio;
use App\Models\Industry;
use App\Models\BlogPost;
use App\Models\Client;
use App\Models\Package;
use App\Models\ContactRequest;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'services_count' => Service::count(),
                'portfolios_count' => Portfolio::count(),
                'industries_count' => Industry::count(),
                'blog_posts_count' => BlogPost::count(),
                'clients_count' => Client::count(),
                'packages_count' => Package::count(),
                'testimonials_count' => Testimonial::count(),
                'new_contacts_count' => ContactRequest::new()->count(),
                'recent_contacts' => ContactRequest::latest()->take(5)->get(),
                'recent_portfolios' => Portfolio::latest()->take(5)->get(),
            ],
        ]);
    }

    public function stats()
    {
        $contactsByStatus = ContactRequest::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $portfoliosByCategory = Portfolio::selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category');

        $monthlyContacts = ContactRequest::selectRaw('MONTH(created_at) as month, count(*) as count')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->pluck('count', 'month');

        return response()->json([
            'success' => true,
            'data' => [
                'contacts_by_status' => $contactsByStatus,
                'portfolios_by_category' => $portfoliosByCategory,
                'monthly_contacts' => $monthlyContacts,
                'total_views' => BlogPost::sum('views'),
            ],
        ]);
    }
}
