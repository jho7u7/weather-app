<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Clima extends Model
{
    protected $fillable = [
        'ciudad',
        'temperatura',
        'humedad',
        'condicion_clima',
        'fecha_consulta',
    ];

    protected $casts = [
        'fecha_consulta' => 'datetime',
        'temperatura' => 'decimal:2',
    ];

    protected $appends = [
        'temp_fahrenheit',
    ];

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class);
    }

    public function getTempFahrenheitAttribute(): float
    {
        return round(((float) $this->temperatura * 9 / 5) + 32, 2);
    }
}