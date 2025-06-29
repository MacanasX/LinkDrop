<?php

namespace App\Providers;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Models\Link;
use App\Observers\LinkObserver;

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
        Link::observe(LinkObserver::class);
        JsonResource::withoutWrapping();
    }
}
