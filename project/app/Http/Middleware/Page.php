<?php

namespace App\Http\Middleware;

use App\Constants\Theme;
use Closure;
use Illuminate\Http\Request;

class Page
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
        // page number
        if (isset($request->_pn)) {
            $request->_pn = ($pn = intval($request->_pn)) > 0 ? $pn : 1;
        } else {
            $request->merge(['_pn' => 1]);
        }

        // items per page
        if (isset($request->_pi)) {
            $request->_pi = ($pi = intval($request->_pi)) > 0 && $pi % 10 === 0 ? $pi : Theme::ITEMS_PER_PAGE;
        } else {
            $request->merge(['_pi' => Theme::ITEMS_PER_PAGE]);
        }

        return $next($request);
    }
}
