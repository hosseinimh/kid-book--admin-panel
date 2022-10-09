<?php

namespace App\Http\Middleware;

use App\Constants\ErrorCode;
use App\Constants\Role;
use Closure;
use Illuminate\Http\Request;

// 'administrator|manager' types users

class AuthHigherManagerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            if (!auth()->user()) {
                throw new \Exception(__('user.user_not_found'));
            } else if (intval(auth()->user()->role) !== Role::ADMINISTRATOR && intval(auth()->user()->role) !== Role::MANAGER) {
                throw new \Exception(__('user.not_authorized'));
            }
        } catch (\Exception $e) {
            return response()->json(['_result' => '0', '_error' => $e->getMessage(), '_errorCode' => ErrorCode::USER_NOT_AUTHORIZED], 200);
        }

        return $next($request);
    }
}
