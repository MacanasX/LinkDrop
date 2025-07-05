<?php

namespace App\Listeners;

use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Events\MediaHasBeenAddedEvent;

class FileHistory
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MediaHasBeenAddedEvent $event): void
    {

        if (!request()->user()->exists()) return;
        $media = $event->media;
        $link = $media->model;

        $data = [
            'type' => $link->type->value,
            'slug' => $link->slug,
            'preview' => Str::limit($media?->getAttribute('file_name'), 40),
        ];

        request()->user()->linkHistory()->create(['data' => $data]);
    }
}
