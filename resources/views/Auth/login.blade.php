@section('title', $title_page)
@extends('Template.login')
@section('content')
<section class="ftco-section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
                <h2 class="heading-section">Login Admin</h2>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                <div class="login-wrap p-0 blur-box border">
                    <form action="#" class="signin-form">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <input id="password-field" type="password" class="form-control" placeholder="Password" required>
                            <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
                        </div>
                        <div class="form-group d-md-flex row">
                            <div class="col-lg-6 col-md-5" style="width: 200px !important;">
                                <label class="checkbox-wrap checkbox-primary d-flex align-items-center justify-content-center">
                                    <input type="checkbox" checked>
                                    Remember Me
                                </label>
                            </div>
                            <div class="col-lg-6 col-md-5" style="width: 200px !important;">
                                <a href="#" style="color: #fff">Forgot Password</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection