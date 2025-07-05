<?php

use App\Jobs\CleanUpExpiredLinks;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::job(CleanUpExpiredLinks::class)->dailyAt('12:00');
