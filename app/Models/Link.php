<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Enums\LinkType;

class Link extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
    protected $casts = [
        'type' => LinkType::class,
        'expires_at' => 'date',
        'created_at' => 'datetime',
        'public' => 'boolean',
        'password' => 'hashed',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function recordAccess(): void
    {
        $this->increment('access_count');
    }

    /* -------------------------------- */
    // Media Collections
    /* -------------------------------- */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media');

    }

    /* -------------------------------- */
    // Scopes
    /* -------------------------------- */
    public function scopePublic($query)
    {
        return $query->where('public', true);
    }

    public function scopePrivate($query)
    {
        return $query->where('public', false);
    }

    public function scopeFile($query)
    {
        return $query->where('type', LinkType::File);
    }

    /* -------------------------------- */
    // Accessors
    /* -------------------------------- */
    protected function accessibleOnce(): Attribute
    {
        return Attribute::get(
            fn() => $this->access_limit === 1
        );
    }

    /* -------------------------------- */
    // Relations
    /* -------------------------------- */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


}
