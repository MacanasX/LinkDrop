<?php

namespace App\Jobs;

use App\Models\Link;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CleanUpExpiredLinks implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Link::query()
            ->where(function ($query) {
                $query->whereDate('expires_at', '<', today())
                    ->orWhere(function ($qq) {
                        $qq->whereNotNull('access_limit')
                            ->whereNotNull('access_count')
                            ->whereColumn('access_count', '>=', 'access_limit');
                    });
            })
            ->orWhere(function ($query) {
                $query->whereNull('access_limit')
                    ->whereNull('expires_at')
                    ->whereNull('user_id')
                    ->where(function ($q) {
                        $q->where(function ($qq) {
                            $qq->public()
                                ->whereDate('created_at', '<', now()->subYears(2));
                        })->orWhere(function ($qq) {
                            $qq->private()
                                ->whereDate('created_at', '<', now()->subYear());
                        });
                    });
            })
            ->orWhere(function ($query) {
                $query->whereNull('access_limit')
                    ->whereNull('expires_at')
                    ->whereNotNull('user_id')
                    ->where(function ($q) {
                        $q->where(function ($qq) {
                            $qq->public()
                                ->whereDate('created_at', '<', now()->subYears(3));
                        })->orWhere(function ($qq) {
                            $qq->private()
                                ->whereDate('created_at', '<', now()->subYears(2));
                        });
                    });
            })
            ->chunkById(100, function ($links) {
                foreach ($links as $link) {
                    $link->delete();
                }
            });

    }
}
