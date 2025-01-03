<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
}
