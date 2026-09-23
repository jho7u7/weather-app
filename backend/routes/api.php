<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\ComentarioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/weather', [WeatherController::class, 'show']);

Route::get('/comentarios', [ComentarioController::class, 'index'])
    ->middleware('auth:sanctum');

Route::post('/comentarios', [ComentarioController::class, 'store'])
    ->middleware('auth:sanctum');

Route::delete('/comentarios/{comentario}', [ComentarioController::class, 'destroy'])
    ->middleware('auth:sanctum');