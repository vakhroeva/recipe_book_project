<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            '*.recipe_id' => 'required|integer|exists:recipes,id',
            '*.name' => 'required|string|max:100',
            '*.amount' => 'required|string|max:50',
        ]);

        if (!isset($validated[0])) {
            return response()->json(['error' => 'Нет ингредиентов в запросе'], 400);
        }

        $recipe = Recipe::findOrFail($validated[0]['recipe_id']);
        $recipe->ingredients()->delete();

        Ingredient::insert($validated);

        return response()->json([
            'message' => 'Ингредиенты успешно добавлены',
            'data' => $validated,
        ], 201);
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
