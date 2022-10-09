<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoryCategories\IndexStoryCategoriesRequest as IndexRequest;
use App\Http\Requests\StoryCategories\StoreStoryCategoryRequest as StoreRequest;
use App\Http\Requests\StoryCategories\UpdateStoryCategoryRequest as UpdateRequest;
use App\Interfaces\StoryCategoryRepositoryInterface as RepositoryInterface;
use App\Models\StoryCategory as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class StoryCategoryController extends Controller
{
    public function __construct(JsonResponse $response, private RepositoryInterface $repository)
    {
        parent::__construct($response);
    }

    public function index(IndexRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->repository->paginate($request->title, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function store(StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->repository->store($request->title));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->repository->update($model, $request->title));
    }
}
