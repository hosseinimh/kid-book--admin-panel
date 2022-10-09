<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Constants\StoragePath;
use App\Constants\StoryItemType;
use App\Http\Requests\StoryItems\IndexStoryItemsRequest as IndexRequest;
use App\Http\Requests\StoryItems\StoreStoryItemRequest as StoreRequest;
use App\Http\Requests\StoryItems\UpdateStoryItemRequest as UpdateRequest;
use App\Interfaces\StoryItemRepositoryInterface as RepositoryInterface;
use App\Models\Story;
use App\Models\StoryItem as Model;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class StoryItemController extends Controller
{
    public function __construct(JsonResponse $response, private RepositoryInterface $repository)
    {
        parent::__construct($response);
    }

    public function index(IndexRequest $request, Story $story): HttpJsonResponse
    {
        return $this->onItems($this->repository->getAll($story));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($model);
    }

    public function store(StoreRequest $request, Story $story, StoryItemType $type): HttpJsonResponse
    {
        if ($model = $this->repository->store($story, $type, $request->content)) {
            if ($type === StoryItemType::IMAGE) {
                $response = [];
                $uploadResult = (new FileUploaderController(StoragePath::STORY_ITEM_IMAGE))->uploadImage($model, $request, 'content', 'content');
                $response['uploadedThumbnail'] = $uploadResult['uploaded'];
                $response['uploadedThumbnailText'] = $uploadResult['uploadedText'];
            }

            return $this->onStore();
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->repository->update($model, $request->content));
    }
}
