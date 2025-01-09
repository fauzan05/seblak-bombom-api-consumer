<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $current_token = $request->cookie('_token');
        if (!$current_token) {
            // back to login page
            return redirect('login');
        }

        if ($current_token) {
            $api_url = config('app.api_url');
            $response = Http::withHeaders(['Authorization' => $current_token])->get($api_url . '/users/current');
            if ($response->unauthorized()) {
                return redirect('login');
            }
        }

        return $next($request);
    }
}
