<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_stories', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('story_category_id');
            $table->unsignedBigInteger('author_id');
            $table->unsignedBigInteger('translator_id');
            $table->unsignedBigInteger('speaker_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('story_category_id')->references('id')->on('tbl_story_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_stories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
