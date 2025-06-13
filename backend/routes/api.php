<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Support\Facades\Route;


Route::prefix('recipes')->middleware('checkAuth')->name('recipes.')->group(function () {
    Route::get('/', [RecipeController::class, 'index'])->name('index')->withoutMiddleware('checkAuth');
    Route::post('/', [RecipeController::class, 'store'])->name('store');
    Route::get('/{recipe}', [RecipeController::class, 'show'])->name('show')->withoutMiddleware('checkAuth');
    Route::post('/{recipe}', [RecipeController::class, 'update'])->name('update');
    Route::delete('/{recipe}', [RecipeController::class, 'destroy'])->name('destroy');
});

Route::prefix('categories')->middleware('checkAuth')->name('categories.')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('index');
});

Route::prefix('users')->middleware('checkAuth')->name('users.')->group(function () {
    Route::post('/login', [UserController::class, 'login'])->name('login')->withoutMiddleware('checkAuth');
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/{user}/recipes', [RecipeController::class, 'userRecipes'])->name('recipes.index');

    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::post('/', [UserController::class, 'store'])->name('store')->withoutMiddleware('checkAuth');
    Route::get('/{user}', [UserController::class, 'show'])->name('show');
    Route::patch('/{user}', [UserController::class, 'update'])->name('update');
    Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
});

Route::prefix('steps')->middleware('checkAuth')->name('steps.')->group(function () {
    Route::post('/', [StepController::class, 'store'])->name('store');
    Route::delete('/{step}', [StepController::class, 'destroy'])->name('destroy');
});

Route::prefix('ingredients')->middleware('checkAuth')->name('ingredients.')->group(function () {
    Route::post('/', [IngredientController::class, 'store'])->name('store');
    Route::delete('/{ingredient}', [IngredientController::class, 'destroy'])->name('destroy');
});

