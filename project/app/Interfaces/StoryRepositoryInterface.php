<?php

namespace App\Interfaces;

use App\Models\StoryCategory;
use App\Models\Story as Model;

interface StoryRepositoryInterface
{
    public function get(int $id): mixed;
    public function paginate(StoryCategory $storyCategory, string|null $title, int $page, int $pageItems): mixed;
    public function countAll(): int;
    public function store(StoryCategory $storyCategory, string $title, int|null $authorId, int|null $translatorId, int|null $speakerId): mixed;
    public function update(Model $model, string $title): bool;
}
