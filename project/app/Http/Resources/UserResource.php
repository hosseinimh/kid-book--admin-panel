<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'mobile' => Helper::localeNumbers($this->mobile),
            'name' => $this->name ?? '',
            'family' => $this->family ?? '',
        ];
    }
}
