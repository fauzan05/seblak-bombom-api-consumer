<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{
    public function login() {
        $data = [
            'title_page' => 'Login Admin'
        ];
        return view('auth.login', $data);
    }

    public function register() {
        $data = [
            'title_page' => 'Register User Customer'
        ];
        return view('register', $data);
    }

    public function index() {
        $data = [
            'title_page' => 'Admin Dashboard'
        ];
        return view('admin.dashboard', $data);
    }

    public function post_login(Request $request) {
        $email = $request->email;
        $password = $request->password;

        $api_url = config('app.api_url');

        $response = Http::post($api_url . '/users/login', [
            'email' => $email,
            'password' => $password
        ]);

        if (!$response->unauthorized()) {
            $get_token = $response['data']['token'];
            $expiry_date = $response['data']['expiry_date'];
            $expiresAt = Carbon::parse($expiry_date);
            $expiresAt->setTimezone('Asia/Jakarta'); // Menyesuaikan zona waktu
            $minutes = Carbon::now('Asia/Jakarta')->diffInMinutes($expiresAt);
            return response('success')
                    ->cookie('_token', $get_token, $minutes, '/', null, true, true);
        } else {
            return json_encode(false);
        }
    }

    public function logout(Request $request) {
        $api_url = config('app.api_url');
        $cookie_token = Cookie::get('_token');
    
        $response = Http::withHeaders([
            'Authorization' => $cookie_token,
            'Content-Type' => 'application/json'
        ])->delete($api_url . '/users/logout');
    
        if ($response->ok()) {
            Cookie::forget('_token');
            return response()->json(true); // Mengirimkan true dalam format JSON
        } else {
            return response()->json(false); // Mengirimkan false dalam format JSON
        }
    }
    
}
