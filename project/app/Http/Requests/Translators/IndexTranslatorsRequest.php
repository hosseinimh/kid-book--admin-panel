<?php

namespace App\Http\Requests\Translators;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class IndexTranslatorsRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'max:50',
            'family' => 'max:50',
        ];
    }

    public function messages()
    {
        return [
            'name.max' => __('translator.name_max'),
            'family.max' => __('translator.family_max'),
        ];
    }
}
