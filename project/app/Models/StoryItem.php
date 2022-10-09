<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoryItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_story_items';
    protected $fillable = [
        'story_id',
        'type',
        'content',
        'priority',
    ];
}
