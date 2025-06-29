<?php

namespace App\Services;


use App\Enums\LinkType;
use App\Models\Link;
use Illuminate\Support\Collection;

class LinkService
{


    public function generateLink(Collection $linkData)
    {

        $data = [
            'type' => $linkData->get('type'),
            'access_limit' => $linkData->get('access_limit'),
            'expires_at' => $linkData->get('expires_at'),
            'public' => $linkData->get('public'),
            'password' => $linkData->get('password'),
        ];
        if ($linkData->get('type') === 'text') {
            $data['data'] = $linkData->get('text');
        }
        if (request()->user()) {
            $data['user_id'] = request()->user()->id;
        }

        $link = Link::create($data);

        if ($link->type === LinkType::File) {
            $link->addMedia($linkData->get('file'))->toMediaCollection('media');
        }

        return $link;
    }


    public function canAccess(Link $link): bool
    {
        if ($link->expires_at && now()->greaterThan($link->expires_at)) {
            return false;
        }

        if ($link->access_limit && $link->access_count >= $link->access_limit) {
            return false;
        }

        return true;
    }

}
