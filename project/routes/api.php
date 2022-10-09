<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\StoryCategoryController;;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\StoryItemController;
use App\Http\Controllers\TranslatorController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// not auth users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);
});

// auth users
Route::middleware(['auth:sanctum', 'auth.higher_manager'])->group(function () {
    Route::post('dashboard/review', [DashboardController::class, 'review']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{user}', [UserController::class, 'show']);
    Route::post('users/update/{user}', [UserController::class, 'update']);
    Route::post('users/change_password/{user}', [UserController::class, 'changePassword']);

    Route::post('story_categories/show/{model}', [StoryCategoryController::class, 'show']);
    Route::post('story_categories/store', [StoryCategoryController::class, 'store']);
    Route::post('story_categories/update/{model}', [StoryCategoryController::class, 'update']);
    Route::post('story_categories', [StoryCategoryController::class, 'index']);

    Route::post('stories/show/{model}', [StoryController::class, 'show']);
    Route::post('stories/store/{storyCategory}', [StoryController::class, 'store']);
    Route::post('stories/update/{model}', [StoryController::class, 'update']);
    Route::post('stories/{storyCategory}', [StoryController::class, 'index']);

    Route::post('story_items/show/{model}', [StoryItemController::class, 'show']);
    Route::post('story_items/store/{story}', [StoryItemController::class, 'store']);
    Route::post('story_items/update/{model}', [StoryItemController::class, 'update']);
    Route::post('story_items/{story}', [StoryItemController::class, 'index']);

    Route::post('authors/show/{model}', [AuthorController::class, 'show']);
    Route::post('authors/store', [AuthorController::class, 'store']);
    Route::post('authors/update/{model}', [AuthorController::class, 'update']);
    Route::post('authors', [AuthorController::class, 'index']);

    Route::post('translators/show/{model}', [TranslatorController::class, 'show']);
    Route::post('translators/store', [TranslatorController::class, 'store']);
    Route::post('translators/update/{model}', [TranslatorController::class, 'update']);
    Route::post('translators', [TranslatorController::class, 'index']);

    Route::post('speakers/show/{model}', [SpeakerController::class, 'show']);
    Route::post('speakers/store', [SpeakerController::class, 'store']);
    Route::post('speakers/update/{model}', [SpeakerController::class, 'update']);
    Route::post('speakers', [SpeakerController::class, 'index']);
});
