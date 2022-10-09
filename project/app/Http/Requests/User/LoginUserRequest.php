<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class LoginUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::USER_NOT_FOUND], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'mobile' => 'required|numeric|digits:11|gt:0',
            'password' => 'required|digits:4',
        ];
    }

    public function messages()
    {
        return [
            'mobile.required' => __('user.mobile_required'),
            'mobile.numeric' => __('user.mobile_numeric'),
            'mobile.digits' => __('user.mobile_digits'),
            'mobile.gt' => __('user.mobile_gt'),
            'password.required' => __('user.password_required'),
            'password.numeric' => __('user.password_numeric'),
            'password.digits' => __('user.password_digits'),
        ];
    }
}
