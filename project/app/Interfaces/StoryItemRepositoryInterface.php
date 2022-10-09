<?php

namespace App\Interfaces;

use App\Constants\StoryItemType;
use App\Models\Story;
use App\Models\StoryItem as Model;

interface StoryItemRepositoryInterface
{
    public function get(int $id): mixed;
    public function getAll(Story $story): mixed;
    public function store(Story $story, StoryItemType $type, string $content): mixed;
    public function update(Model $model, string $content): bool;
    public function incrementPriority(Model $model): bool;
    public function decrementPriority(Model $model): bool;
}
