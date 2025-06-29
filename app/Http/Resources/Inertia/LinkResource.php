<?php

namespace App\Http\Resources\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LinkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $media = $this->getFirstMedia('media');

        return [
            'type' => $this->type,
            'slug' => $this->slug,
            'data' => $this->when(!is_null($this->data), $this->data),
            'media' => [
                'url' => $this?->getFirstMediaUrl('media') ?? null,
                'fileName' => $media?->getAttribute('file_name') ?? null,
                'mimeType' => $media?->getAttribute('mime_type') ?? null,
                'size' => $media?->getAttribute('size') ?? null,
            ],
            'accessibleOnce' => $this->accessibleOnce,
            'accessLimit' => $this->access_limit,
            'expiresAt' => $this?->expires_at?->format('d-m-Y'),
            'accessCount' => $this->access_count,
            'createdAt' => $this->created_at->format('d-m-Y'),
            'creator' => $this?->creator?->name,
            'password' => $this->password,
            'accessGranted' => $request->session()->get("access_granted.{$this->slug}")
        ];
    }
}
