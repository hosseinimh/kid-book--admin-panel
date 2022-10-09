<?php

namespace App\Repositories;

use App\Interfaces\TranslatorRepositoryInterface as RepositoryInterface;
use App\Models\Translator as Model;

class TranslatorRepository extends Repository implements RepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(string|null $name, string|null $family, int $page, int $pageItems): mixed
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    public function store(string $name, string $family, string|null $description): mixed
    {
        $data = [
            'name' => $name,
            'family' => $family,
            'description' => $description ?? '',
        ];

        return Model::create($data);
    }

    public function update(Model $model, string $name, string $family, string|null $description): bool
    {
        $data = [
            'name' => $name,
            'family' => $family,
            'description' => $description ?? '',
        ];

        return $model->update($data);
    }
}
