<?php

use App\Http\Controllers\FaqController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;


Route::controller(LinkController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::post('/links', 'store')->name('links.store');
    Route::get('/links/{link}', 'show')->name('links.show');
    Route::get('/spotlight', 'spotlight')->name('spotlight');
    Route::post('links/{link}/verify', 'verifyPassword')->name('links.verify');
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'loginForm')->name('login.form');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout')->middleware('auth')->name('logout');
    Route::get('/register', 'registerForm')->name('register.form');
    Route::post('/register', 'register')->name('register');
});

Route::controller(ProfileController::class)->middleware('auth')->group(function () {
    Route::delete('/profile', 'deleteProfile')->name('delete.profile');
    Route::get('/profile', 'profile')->name('show.profile');
});

Route::get('/faq', FaqController::class)->name('faq');


