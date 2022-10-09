<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepository;
use App\Services\JsonResponse;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function review(): HttpJsonResponse
    {
        $items = ['users' => (new UserRepository())->countAll()];

        return $this->onItems($items);
    }
}
