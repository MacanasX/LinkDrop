<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Enums\LinkType;

class Link extends Model
{
    protected array $cast = [
        'type' => LinkType::class,
    ];
}
