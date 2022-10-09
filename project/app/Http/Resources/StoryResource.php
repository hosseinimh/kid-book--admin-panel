<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => $this->title ?? '',
            'storyCategoryId' => $this->story_category_id,
            'authorId' => $this->author_id,
            'authorName' => $this->author_name ?? '',
            'authorFamily' => $this->author_family ?? '',
            'translatorId' => $this->translator_id,
            'translatorName' => $this->translator_name ?? '',
            'translatorFamily' => $this->translator_family ?? '',
            'speakerId' => $this->speaker_id,
            'speakerName' => $this->speaker_name ?? '',
            'speakerFamily' => $this->speaker_family ?? '',
        ];
    }
}
