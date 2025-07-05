<?php

namespace App\Http\Resources\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LinkHistory extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => data_get($this->resource->data, 'type'),
            'slug' => data_get($this->resource->data, 'slug'),
            'createdAt' => $this->created_at->format('d.m.Y H:i'),
            'preview' => data_get($this->resource->data, 'preview'),
        ];
    }
}
