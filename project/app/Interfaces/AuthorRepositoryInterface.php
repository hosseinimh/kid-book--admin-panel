<?php

namespace App\Interfaces;

use App\Models\Author as Model;

interface AuthorRepositoryInterface
{
    public function get(int $id): mixed;
    public function paginate(string|null $name, string|null $family, int $page, int $pageItems): mixed;
    public function getAll(): mixed;
    public function countAll(): int;
    public function store(string $name, string $family, string|null $description): mixed;
    public function update(Model $model, string $name, string $family, string|null $description): bool;
}
