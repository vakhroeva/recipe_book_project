<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Users were returned successfully',
            'data' => User::all(),
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:55',
            'email' => 'required|unique:users|email',
            'login' => 'required|string|max:15',
            'password' => 'required|string|min:4|max:15',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }

    public function show(User $user)
    {
        $user->load([
            'recipes.steps',
            'recipes.ingredients',
        ]);

        return response()->json([
            'message' => 'User was returned successfully',
            'data' => $user,
        ], 200);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => 'sometimes|required|string|max:55',
            'email' => 'sometimes|required|unique:users,email,' . $user->id,
            'login' => 'sometimes|required|string|max:15',
            'password' => 'sometimes|required|string|min:4|max:15',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
            'data' => null,
        ], 200);
    }
}
