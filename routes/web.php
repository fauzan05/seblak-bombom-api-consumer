<?php

use App\Http\Controllers\AdminController;
use App\Http\Middleware\EnsureTokenIsValid;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', [AdminController::class, 'login']);
Route::post('/login', [AdminController::class, 'post_login']);

Route::middleware([EnsureTokenIsValid::class])->group(function () {
    Route::get('/admin/{any}', [AdminController::class, 'index']);
});

