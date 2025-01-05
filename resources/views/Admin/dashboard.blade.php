@section('title', $title_page)
@extends('Template.admin')
@section('content')
<div id="app">
    <router-view></router-view>
</div>
@endsection