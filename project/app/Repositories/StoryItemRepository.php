<?php

namespace App\Repositories;

use App\Constants\StoryItemType;
use App\Interfaces\StoryItemRepositoryInterface as RepositoryInterface;
use App\Models\Story;
use App\Models\StoryItem as Model;

class StoryItemRepository extends Repository implements RepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getAll(Story $story): mixed
    {
        return Model::where('story_id', $story->id)->orderBy('priority', 'ASC')->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    public function store(Story $story, StoryItemType $type, string $content): mixed
    {
        $max = $this->maxPriority();
        $priority = $max ? $max->priority + 1 : 1;
        $data = [
            'story_id' => $story->id,
            'type' => $type,
            'content' => $content ?? '',
            'priority' => $priority,
        ];

        return Model::create($data);
    }

    public function update(Model $model, string $content): bool
    {
        $data = [
            'content' => $content,
        ];

        return $model->update($data);
    }

    public function incrementPriority(Model $model): bool
    {
        $next = $this->nextPriority($model);

        if (!$next) {
            return false;
        }

        $result = $this->handleIncrementPriority($model);

        if ($result) {
            $this->handleDecrementPriority($next);
        }

        return $result;
    }

    public function decrementPriority(Model $model): bool
    {
        $before = $this->beforePriority($model);

        if (!$before) {
            return false;
        }

        $result = $this->handleDecrementPriority($model);

        if ($result) {
            $this->handleIncrementPriority($before);
        }

        return $result;
    }

    private function maxPriority(): mixed
    {
        return Model::orderBy('priority', 'DESC')->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->first();
    }

    private function nextPriority(Model $model)
    {
        return Model::where('id', '!=', $model->id)->where('priority', '>', $model->priority)->orderBy('priority', 'ASC')->orderBy('created_at', 'ASC')->orderBy('id', 'ASC')->first();
    }

    private function beforePriority(Model $model)
    {
        return Model::where('id', '!=', $model->id)->where('priority', '<', $model->priority)->orderBy('priority', 'ASC')->orderBy('created_at', 'ASC')->orderBy('id', 'ASC')->first();
    }

    private function handleIncrementPriority(Model $model): bool
    {
        $data = [
            'priority' => $model->priority + 1,
        ];

        return $model->update($data);
    }

    private function handleDecrementPriority(Model $model): bool
    {
        $data = [
            'priority' => $model->priority - 1,
        ];

        return $model->update($data);
    }
}
