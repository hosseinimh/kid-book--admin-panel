<?php

namespace App\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function get(int $userId): mixed;
    public function paginate(string|null $username, string|null $name, string|null $family, int $page, int $pageItems): mixed;
    public function countAll(): int;
    public function update(User $user, $name, $family): bool;
    public function changePassword(User $user, string $password): bool;
}
