<?php

namespace App\Http\Controllers;

use App\Http\Requests\Authors\IndexAuthorsRequest as IndexRequest;
use App\Http\Requests\Authors\StoreAuthorRequest as StoreRequest;
use App\Http\Requests\Authors\UpdateAuthorRequest as UpdateRequest;
use App\Interfaces\AuthorRepositoryInterface as RepositoryInterface;
use App\Models\Author as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class AuthorController extends Controller
{
    public function __construct(JsonResponse $response, private RepositoryInterface $repository)
    {
        parent::__construct($response);
    }

    public function index(IndexRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->repository->paginate($request->name, $request->family, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function store(StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->repository->store($request->name, $request->family, $request->description));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->repository->update($model, $request->name, $request->family, $request->description));
    }
}
