<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comentario extends Model
{
    protected $fillable = [
        'clima_id',
        'comentario',
    ];

    public function clima(): BelongsTo
    {
        return $this->belongsTo(Clima::class);
    }   
}
