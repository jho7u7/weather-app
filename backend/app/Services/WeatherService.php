<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
   // Consulta OpenWeather y devuelve los datos principales del clima por ciudadd
    public function getWeather(string $city): array
    {
        $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
            'q' => $city,
            'appid' => config('services.openweather.key'),
            'units' => 'metric',
            'lang' => 'es',
        ]);

        if ($response->failed()) {
            throw new \Exception('No se pudo consultar el clima.');
        }

        $data = $response->json();

        return [
            'ciudad' => $data['name'],
            'temperatura' => $data['main']['temp'],
            'humedad' => $data['main']['humidity'],
            'condicion_clima' => $data['weather'][0]['description'],
        ];
    }
}