<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => '09155295009_3',
            'password' => '1234',
            'mobile' => '09155295009',
            'name' => 'محمود',
            'family' => 'حسینی',
        ];
    }
}
