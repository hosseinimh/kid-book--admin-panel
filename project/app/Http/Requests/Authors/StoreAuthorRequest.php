<?php

namespace App\Http\Requests\Authors;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreAuthorRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50',
            'family' => 'required|min:3|max:50',
            'description' => 'max:2000',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('author.name_required'),
            'name.min' => __('author.name_min'),
            'name.max' => __('author.name_max'),
            'family.required' => __('author.family_required'),
            'family.min' => __('author.family_min'),
            'family.max' => __('author.family_max'),
            'description.max' => __('author.description_max'),
        ];
    }
}
