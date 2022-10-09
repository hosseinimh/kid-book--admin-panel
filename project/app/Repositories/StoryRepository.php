<?php

namespace App\Repositories;

use App\Interfaces\StoryRepositoryInterface as RepositoryInterface;
use App\Models\Story as Model;
use App\Models\StoryCategory;

class StoryRepository extends Repository implements RepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(StoryCategory $storyCategory, string|null $title, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_story_categories', 'tbl_stories.story_category_id', '=', 'tbl_story_categories.id')->leftJoin('tbl_authors', 'tbl_stories.author_id', '=', 'tbl_authors.id')->leftJoin('tbl_translators', 'tbl_stories.translator_id', '=', 'tbl_translators.id')->leftJoin('tbl_speakers', 'tbl_stories.speaker_id', '=', 'tbl_speakers.id')->select('tbl_stories.*', 'tbl_authors.name AS author_name', 'tbl_authors.family AS author_family', 'tbl_translators.name AS translator_name', 'tbl_translators.family AS translator_family', 'tbl_speakers.name AS speaker_name', 'tbl_speakers.family AS speaker_family')->where('tbl_story_categories.id', $storyCategory->id)->where('tbl_stories.title', 'LIKE', '%' . $title . '%')->orderBy('tbl_stories.created_at', 'DESC')->orderBy('tbl_stories.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    public function store(StoryCategory $storyCategory, string $title, int|null $authorId, int|null $translatorId, int|null $speakerId): mixed
    {
        $data = [
            'title' => $title,
            'story_category_id' => $storyCategory->id,
            'author_id' => $authorId ?? 0,
            'translator_id' => $translatorId ?? 0,
            'speaker_id' => $speakerId ?? 0,
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
