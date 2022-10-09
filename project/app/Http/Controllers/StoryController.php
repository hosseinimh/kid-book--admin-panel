<?php

namespace App\Http\Controllers;

use App\Http\Requests\Stories\IndexStoriesRequest as IndexRequest;
use App\Http\Requests\Stories\StoreStoryRequest as StoreRequest;
use App\Http\Requests\Stories\UpdateStoryRequest as UpdateRequest;
use App\Interfaces\StoryRepositoryInterface as RepositoryInterface;
use App\Models\Story as Model;
use App\Models\StoryCategory;
use App\Repositories\AuthorRepository;
use App\Repositories\SpeakerRepository;
use App\Repositories\TranslatorRepository;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class StoryController extends Controller
{
    public function __construct(JsonResponse $response, private RepositoryInterface $repository)
    {
        parent::__construct($response);
    }

    public function index(IndexRequest $request, StoryCategory $storyCategory): HttpJsonResponse
    {
        $data = [];
        $data['items'] = $this->repository->paginate($storyCategory, $request->title, $request->_pn, $request->_pi);
        $data['authors'] = (new AuthorRepository())->getAll();
        $data['translators'] = (new TranslatorRepository())->getAll();
        $data['speakers'] = (new SpeakerRepository())->getAll();

        return $this->onOk($data);
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function store(StoreRequest $request, StoryCategory $storyCategory): HttpJsonResponse
    {
        return $this->onStore($this->repository->store($storyCategory, $request->title, $request->author_id, $request->translator_id, $request->speaker_id));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->repository->update($model, $request->title));
    }
}
