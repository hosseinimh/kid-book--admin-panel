<?php

namespace App\Repositories;

use App\Interfaces\StoryCategoryRepositoryInterface as RepositoryInterface;
use App\Models\StoryCategory as Model;

class StoryCategoryRepository extends Repository implements RepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(string|null $title, int $page, int $pageItems): mixed
    {
        return Model::where('title', 'LIKE', '%' . $title . '%')->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    public function store(string $title): mixed
    {
        $data = [
            'title' => $title,
        ];

        return Model::create($data);
    }

    public function update(Model $model, string $title): bool
    {
        $data = [
            'title' => $title,
        ];

        return $model->update($data);
    }
}
