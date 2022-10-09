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
        Schema::create('tbl_story_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('story_id');
            $table->enum('type', ['text-fa', 'text_en', 'image']);
            $table->text('content');
            $table->unsignedTinyInteger('priority');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('story_id')->references('id')->on('tbl_stories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_story_items', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
