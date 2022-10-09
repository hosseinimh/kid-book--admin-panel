<?php

namespace App\Interfaces;

use App\Models\StoryCategory as Model;

interface StoryCategoryRepositoryInterface
{
    public function get(int $id): mixed;
    public function paginate(string|null $title, int $page, int $pageItems): mixed;
    public function countAll(): int;
    public function store(string $title): mixed;
    public function update(Model $model, string $title): bool;
}
