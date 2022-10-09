<?php

namespace App\Http\Requests\News;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreNewsRequest extends FormRequest
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
            'description' => 'max:2000',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('news.title_required'),
            'title.min' => __('news.title_min'),
            'title.max' => __('news.title_max'),
            'description.max' => __('news.description_max'),
        ];
    }
}
