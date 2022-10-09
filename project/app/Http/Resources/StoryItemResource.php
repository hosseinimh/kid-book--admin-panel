<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'storyId' => intval($this->story_id),
            'type' => $this->type,
            'content' => $this->content ?? '',
            'priority' => intval($this->priority),
        ];
    }
}
