<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Support\Facades\Route;


Route::prefix('recipes')->name('recipes.')->group(function () {
    Route::get('/', [RecipeController::class, 'index'])->name('index');
    Route::post('/', [RecipeController::class, 'store'])->name('store');
    Route::get('/{recipe}', [RecipeController::class, 'show'])->name('show');
    Route::patch('/{recipe}', [RecipeController::class, 'update'])->name('update');
    Route::delete('/{recipe}', [RecipeController::class, 'destroy'])->name('destroy');
});

Route::prefix('categories')->name('categories.')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('index');
});

Route::prefix('users')->name('users.')->group(function () {
    Route::post('/login', [UserController::class, 'login'])->name('login');
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::post('/', [UserController::class, 'store'])->name('store');
    Route::get('/{user}', [UserController::class, 'show'])->name('show');
    Route::patch('/{user}', [UserController::class, 'update'])->name('update');
    Route::delete('/{user}', [UserController::class, 'destroy'])->name('destroy');
});

Route::prefix('steps')->name('steps.')->group(function () {
    Route::post('/', [StepController::class, 'store'])->name('store');
    Route::put('/{step}', [StepController::class, 'update'])->name('update');
    Route::delete('/{step}', [StepController::class, 'destroy'])->name('destroy');
});

Route::prefix('ingredients')->name('ingredients.')->group(function () {
    Route::post('/', [IngredientController::class, 'store'])->name('store');
    Route::put('/{ingredient}', [IngredientController::class, 'update'])->name('update');
    Route::delete('/{ingredient}', [IngredientController::class, 'destroy'])->name('destroy');
});

