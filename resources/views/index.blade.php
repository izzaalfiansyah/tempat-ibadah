<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Aplikasi Pencarian Data Tempat Ibadah</title>
        <link rel="shotcut icon" href="{{ asset('icon.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('icon.png') }}">
        <link rel="stylesheet" href="{{ asset('plugins/bootstrap/css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('plugins/leaflet/leaflet.css') }}">
        <link rel="stylesheet" href="{{ asset('plugins/fontawesome/css/all.min.css') }}">
        <link rel="stylesheet" href="{{ asset('plugins/sweetalert2/sweetalert2.min.css') }}">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <div id="app" style="overflow-x: hidden;"></div>
        <script>var baseUrl = '{{ url("/") }}';</script>
        <script src="{{ asset('plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
        <script src="{{ asset('assets/js/app.js') }}"></script>
        <script src="{{ asset('plugins/leaflet/leaflet.js') }}"></script>
        <script src="{{ asset('plugins/sweetalert2/sweetalert2.min.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>