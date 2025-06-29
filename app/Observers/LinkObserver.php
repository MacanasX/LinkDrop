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

}
