<?php

namespace App\Observers;

use App\Enums\LinkType;
use App\Models\Link;
use Illuminate\Support\Str;

class LinkObserver
{
    public function creating(Link $link)
    {

        $link->slug = Str::orderedUuid()->toString();
    }


    public function created(Link $link)
    {
        if (!$link->creator()->exists() || $link->type === LinkType::File) return;

        $data = [
            'type' => $link->type->value,
            'slug' => $link->slug,
            'preview' => Str::limit($link->data, 40),
        ];
        request()->user()->linkHistory()->create(['data' => $data]);
    }

}
