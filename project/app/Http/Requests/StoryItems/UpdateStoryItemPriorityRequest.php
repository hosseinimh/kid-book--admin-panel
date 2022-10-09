<?php

namespace App\Http\Requests\StoryItems;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateStoryItemPriorityRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'priority' => 'required|numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'priority.required' => __('story_item.priority_required'),
            'priority.numeric' => __('story_item.priority_numeric'),
            'priority.gt' => __('story_item.priority_gt'),
        ];
    }
}
