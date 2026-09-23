<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    //get comentarios
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'clima_id' => ['required', 'integer', 'exists:climas,id'],
        ]);

        $comentarios = Comentario::where('clima_id', $request->clima_id)
            ->latest()
            ->get();

        return response()->json($comentarios, 200);
    }
    //post comentarios -- en cada usuario 
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'clima_id' => ['required', 'integer', 'exists:climas,id'],
            'comentario' => ['required', 'string', 'max:1000'],
        ]);

        $comentario = Comentario::create([
            'clima_id' => $request->clima_id,
            'user_id' => $request->user()->id,
            'comentario' => $request->comentario,
        ]);

        return response()->json($comentario, 201);
    }
///delete comentarios
    public function destroy(Request $request, Comentario $comentario): JsonResponse
    {
        if ($comentario->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'No tienes permiso para eliminar este comentario.',
            ], 403);
        }

        $comentario->delete();

        return response()->json([
            'message' => 'Comentario eliminado correctamente.',
        ], 200);
    }
}