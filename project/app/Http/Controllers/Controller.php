<?php

namespace App\Http\Controllers;

use App\Services\JsonResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct(protected JsonResponse $response)
    {
        date_default_timezone_set('Asia/Tehran');
    }

    public function onItem($item): HttpJsonResponse
    {
        return $this->response->itemResponse($item);
    }

    public function onItems($items)
    {
        return $this->response->itemsResponse($items);
    }

    public function onStore(Model|bool $model = true): HttpJsonResponse
    {
        return $this->response->storeResponse($model);
    }

    public function onUpdate(bool $result = true): HttpJsonResponse
    {
        return $this->response->updateResponse($result);
    }

    public function onDelete(bool $result = true): HttpJsonResponse
    {
        return $this->response->deleteResponse($result);
    }

    public function onBoolean(bool $result): HttpJsonResponse
    {
        return $this->response->booleanResponse($result);
    }

    public function onOk(array|null $data = null): HttpJsonResponse
    {
        return $this->response->okResponse($data);
    }

    public function onError(array|null $data = null): HttpJsonResponse
    {
        return $this->response->errorResponse($data);
    }
}
