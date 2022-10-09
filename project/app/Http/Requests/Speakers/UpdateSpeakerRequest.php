<?php

namespace App\Http\Requests\Speakers;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateSpeakerRequest extends FormRequest
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
            'name.required' => __('speaker.name_required'),
            'name.min' => __('speaker.name_min'),
            'name.max' => __('speaker.name_max'),
            'family.required' => __('speaker.family_required'),
            'family.min' => __('speaker.family_min'),
            'family.max' => __('speaker.family_max'),
            'description.max' => __('speaker.description_max'),
        ];
    }
}
