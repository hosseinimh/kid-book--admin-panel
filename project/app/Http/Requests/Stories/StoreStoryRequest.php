<?php

namespace App\Http\Requests\Stories;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreStoryRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'title' => 'required|min:3|max:50',
            'author_id' => 'numeric|gte:0',
            'translator_id' => 'numeric|gte:0',
            'speaker_id' => 'numeric|gte:0',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('story.title_required'),
            'title.min' => __('story.title_min'),
            'title.max' => __('story.title_max'),
            'author_id.numeric' => __('story.author_id_numeric'),
            'author_id.gte' => __('story.author_id_gte'),
            'translator_id.numeric' => __('story.translator_id_numeric'),
            'translator_id.gte' => __('story.translator_id_gte'),
            'speaker_id.numeric' => __('story.speaker_id_numeric'),
            'speaker_id.gte' => __('story.speaker_id_gte'),
        ];
    }
}
