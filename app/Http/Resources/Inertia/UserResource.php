<?php

namespace App\Http\Resources\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'createdAt' => $this->created_at->format('d-m-Y'),
            'numberOfLinks' => $this->links()->count(),
        ];
    }
}
