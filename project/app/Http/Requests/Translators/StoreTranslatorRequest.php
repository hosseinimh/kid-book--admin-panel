<?php

namespace App\Http\Requests\Translators;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreTranslatorRequest extends FormRequest
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
            'name.required' => __('translator.name_required'),
            'name.min' => __('translator.name_min'),
            'name.max' => __('translator.name_max'),
            'family.required' => __('translator.family_required'),
            'family.min' => __('translator.family_min'),
            'family.max' => __('translator.family_max'),
            'description.max' => __('translator.description_max'),
        ];
    }
}
