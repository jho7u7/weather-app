<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clima;
use App\Services\WeatherService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function __construct(
        private WeatherService $weatherService
    ) {
    }

    // Consultar el clima, guardar el resultado y devolver los datos en JSON.
    public function show(Request $request): JsonResponse
    {
        $request->validate([
            'city' => ['required', 'string', 'max:100'],
        ]);

        try {
            $weather = $this->weatherService->getWeather($request->city);

            $clima = Clima::create([
                'ciudad' => $weather['ciudad'],
                'temperatura' => $weather['temperatura'],
                'humedad' => $weather['humedad'],
                'condicion_clima' => $weather['condicion_clima'],
                'fecha_consulta' => now(),
            ]);

            return response()->json($clima, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'No se pudo consultar el clima.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}