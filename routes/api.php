<?php
/**
 * API routes for this Nova tool.
 * These routes are loaded by the ServiceProvider of this tool.
 * They are protected by this tool's "Authorize" middleware.
 */

namespace DiegoDrese\NovaCep\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Laravel\Nova\Http\Requests\NovaRequest;

Route::get('cep', function(NovaRequest $request) {
    $value = $request->input('value');
    $response = Http::get("https://viacep.com.br/ws/{$value}/json/");
    return $response->json();
})->name('cep.search');
