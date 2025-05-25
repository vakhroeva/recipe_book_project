<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::with('user', 'category', 'ingredients');

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        $query = $query->get();

        return response()->json([
            'message' => 'Recipes were returned successfully',
            'data' => $query,
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|min:5|max:50',
            'description' => 'nullable|string',
            'photo' => 'required|image|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $path = $request->file('photo')->store('recipes', 'public');
        $recipe = Recipe::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
            'main_photo_url' => $path ? "/storage/$path" : null,
        ]);

        return response()->json([
            'message' => 'Recipe created successfully',
            'data' => $recipe,
        ], 201);
    }

    public function show(Recipe $recipe)
    {
        $recipe->load([
            'user',
            'category',
            'steps',
            'ingredients',
        ]);

        return response()->json([
            'message' => 'Recipe was returned successfully',
            'data' => $recipe,
        ], 200);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'title' => 'sometimes|required|string|min:5|max:50',
            'description' => 'nullable|string',
            'main_photo_url' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $recipe->update($validated);

        return response()->json([
            'message' => 'Recipe updated successfully',
            'data' => $recipe,
        ], 200);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully',
            'data' => null,
        ], 200);
    }
}
