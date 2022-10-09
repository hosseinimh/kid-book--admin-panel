<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SpeakerController;
use App\Http\Controllers\StoryCategoryController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\StoryItemController;
use App\Http\Controllers\TranslatorController;
use App\Http\Controllers\UserController;
use App\Http\Resources\AuthorResource;
use App\Http\Resources\SpeakerResource;
use App\Http\Resources\StoryCategoryResource;
use App\Http\Resources\StoryItemResource;
use App\Http\Resources\StoryResource;
use App\Http\Resources\TranslatorResource;
use App\Http\Resources\UserResource;
use App\Repositories\AuthorRepository;
use App\Repositories\SpeakerRepository;
use App\Repositories\StoryCategoryRepository;
use App\Repositories\StoryItemRepository;
use App\Repositories\StoryRepository;
use App\Repositories\TranslatorRepository;
use App\Repositories\UserRepository;
use App\Services\JsonResponse;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(AuthorController::class, function ($app) {
            return new AuthorController(new JsonResponse(AuthorResource::class), $app->make(AuthorRepository::class));
        });

        $this->app->bind(TranslatorController::class, function ($app) {
            return new TranslatorController(new JsonResponse(TranslatorResource::class), $app->make(TranslatorRepository::class));
        });

        $this->app->bind(SpeakerController::class, function ($app) {
            return new SpeakerController(new JsonResponse(SpeakerResource::class), $app->make(SpeakerRepository::class));
        });

        $this->app->bind(StoryCategoryController::class, function ($app) {
            return new StoryCategoryController(new JsonResponse(StoryCategoryResource::class), $app->make(StoryCategoryRepository::class));
        });

        $this->app->bind(StoryController::class, function ($app) {
            return new StoryController(new JsonResponse(StoryResource::class), $app->make(StoryRepository::class));
        });

        $this->app->bind(StoryItemController::class, function ($app) {
            return new StoryItemController(new JsonResponse(StoryItemResource::class), $app->make(StoryItemRepository::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserRepository::class));
        });
    }
}
