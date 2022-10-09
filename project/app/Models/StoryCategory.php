<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoryCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_story_categories';
    protected $fillable = [
        'title',
    ];
}
