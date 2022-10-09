<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Story extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_stories';
    protected $fillable = [
        'title',
        'story_category_id',
        'author_id',
        'translator_id',
        'speaker_id',
    ];
}
