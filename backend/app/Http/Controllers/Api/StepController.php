<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

        $steps = [];

        foreach ($validated as $stepData) {
            $steps[] = Step::create($stepData);
        }

        return response()->json([
            'message' => 'Шаги добавлены',
            'data' => $steps
        ], 201);
    }

    public function update(Request $request, Step $step)
    {
        $validated = $request->validate([
            'step_number' => 'sometimes|required|integer',
            'instruction' => 'sometimes|required|string',
        ]);

        $step->update($validated);

        return response()->json([
            'message' => 'Step updated successfully',
            'data' => $step,
        ], 200);
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
