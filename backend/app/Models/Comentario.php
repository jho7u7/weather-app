<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class Comentario extends Model
{
    protected $fillable = [
        'clima_id',
        'user_id',
        'comentario',
    ];

    public function clima(): BelongsTo
    {
        return $this->belongsTo(Clima::class);
    }   

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
