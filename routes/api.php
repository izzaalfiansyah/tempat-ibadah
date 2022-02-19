<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers as Controller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', [Controller\UserController::class, 'index']);
Route::get('/tempat/filter/{column}', [Controller\TempatController::class, 'getColumn']);

Route::post('/user', [Controller\UserController::class, 'save']);
Route::post('/user/login', [Controller\UserController::class, 'login']);
Route::post('/user/password', [Controller\UserController::class, 'password']);

Route::resource('/tempat', Controller\TempatController::class);
Route::resource('/jenis', Controller\JenisController::class);