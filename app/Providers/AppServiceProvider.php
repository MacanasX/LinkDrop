<?php

namespace App\Providers;


use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use Spatie\MediaLibrary\MediaCollections\Events\MediaHasBeenAddedEvent;
use App\Models\Link;
use App\Observers\LinkObserver;
use App\Listeners\FileHistory;


class AppServiceProvider extends ServiceProvider
{

    protected $listen = [
        MediaHasBeenAddedEvent::class => [
            FileHistory::class,
        ],
    ];

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
