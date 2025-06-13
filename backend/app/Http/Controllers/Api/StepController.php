<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use App\Models\Step;
use Illuminate\Http\Request;

class StepController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            '*.recipe_id' => 'required|integer|exists:recipes,id',
            '*.step_number' => 'required|integer',
            '*.instruction' => 'required|string',
        ]);

        //$steps = [];

        $recipe = Recipe::findOrFail($validated[0]['recipe_id']);
        $recipe->steps()->delete();

        //foreach ($validated as $stepData) {
        //    $steps[] = Step::create($stepData);
        //}

        $created = Step::insert($validated);

        return response()->json([
            'message' => 'Шаги добавлены',
            'data' => $created
        ], 201);
    }

    public function destroy(Step $step)
    {
        $step->delete();

        return response()->json([
            'message' => 'Step deleted successfully',
            'data' => null,
        ], 200);
    }
}
