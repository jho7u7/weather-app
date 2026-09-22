<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'clima_id' => ['required', 'integer', 'exists:climas,id'],
            'comentario' => ['required', 'string', 'max:1000'],
        ]);

        $comentario = Comentario::create([
            'clima_id' => $request->clima_id,
            'comentario' => $request->comentario,
        ]);

        return response()->json($comentario, 201);
    }
}