<!doctype html>
<html lang="en">

<head>
	<title>@yield('title')</title>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

	<!-- General CSS Files -->
	<link rel="stylesheet" href="{{ asset('assets/auth/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/bootstrap/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/fontawesome/css/all.min.css') }}">

	<!-- CSS Libraries -->
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/jqvmap/dist/jqvmap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/weather-icon/css/weather-icons.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/weather-icon/css/weather-icons-wind.min.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/summernote/summernote-bs4.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/modules/jquery-selectric/selectric.css') }}">

	<!-- Template CSS -->
	<link rel="stylesheet" href="{{ asset('assets/admin/css/style.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/css/custom.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/css/components.css') }}">
	@vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="sidebar-mini">
	<div id="app">
		<div class="main-wrapper main-wrapper-1">
			@include('Template.Admin.navbar')
			@include('Template.Admin.sidebar')
			@yield('content')
			@include('Template.Admin.footer')
		</div>
	</div>
</body>

</html>