<?php

namespace App\Http\Requests\StoryItems;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateStoryItemRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'content' => 'required|min:3|max:2000',
        ];
    }

    public function messages()
    {
        return [
            'content.required' => __('story_item.content_required'),
            'content.min' => __('story_item.content_min'),
            'content.max' => __('story_item.content_max'),
        ];
    }
}
