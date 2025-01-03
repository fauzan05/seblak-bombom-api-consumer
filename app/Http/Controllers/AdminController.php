<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function login() {
        $data = [
            'title_page' => 'Login Admin'
        ];
        return view('auth.login', $data);
    }

    public function post_login() {

    }
}
