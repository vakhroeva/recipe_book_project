<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipe_id' => 'required|integer|exists:recipes,id',
            'name' => 'required|string|max:100',
            'amount' => 'required|string|max:50',
        ]);

        $ingredient = Ingredient::create($validated);

        return response()->json([
            'message' => 'Ingredient created successfully',
            'data' => $ingredient,
        ], 201);
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'amount' => 'sometimes|required|string|max:50',
        ]);

        $ingredient->update($validated);

        return response()->json([
            'message' => 'Ingredient updated successfully',
            'data' => $ingredient,
        ], 200);
    }

    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();

        return response()->json([
            'message' => 'Ingredient deleted successfully',
            'data' => null,
        ], 200);
    }
}
