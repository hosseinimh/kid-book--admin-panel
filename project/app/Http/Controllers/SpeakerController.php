<?php

namespace App\Http\Controllers;

use App\Http\Requests\Speakers\IndexSpeakersRequest as IndexRequest;
use App\Http\Requests\Speakers\StoreSpeakerRequest as StoreRequest;
use App\Http\Requests\Speakers\UpdateSpeakerRequest as UpdateRequest;
use App\Interfaces\SpeakerRepositoryInterface as RepositoryInterface;
use App\Models\Speaker as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class SpeakerController extends Controller
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
