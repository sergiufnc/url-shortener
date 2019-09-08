<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('/submit-link', function (Request $request) use ($router) {
    $code = uniqid();

    $id = DB::table('links')->insertGetId(
        [
            'code' => $code,
            'shortened_link' => url($code),
            'original_link' => $request->input('new_link'),
            'updated_at' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s')
        ]
    );

    $link = DB::table('links')->where('id', $id)->first();

    return response()->json($link);
});

$router->get('/load-links', function () use ($router) {
    $links = DB::table('links')->orderBy('id', 'desc')->get();

    foreach ($links as $link) {
        $link->clicks_total = DB::table('redirects')->where('link_id', $link->id)->count();
        $link->clicks_today = DB::table('redirects')->where('link_id', $link->id)->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])->count();
    }

    return response()->json($links);
});

$router->get('/load-link/{code}', function (Request $request) use ($router) {
    $link = DB::table('links')->where('code', $request->route('code'))->first();

    $link->clicks_total = DB::table('redirects')->where('link_id', $link->id)->count();
    $link->clicks_today = DB::table('redirects')->where('link_id', $link->id)->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])->count();

    $redirects = DB::table('redirects')->where('link_id', $link->id)->orderBy('id', 'desc')->get();

    return response()->json([
        'link' => $link,
        'redirects' => $redirects
    ]);
});

$router->get('/{code}', function (Request $request) use ($router) {
    $link = DB::table('links')->where('code', $request->route('code'))->first();

    if (empty($link)) {
        return redirect('/');
    }

    DB::table('redirects')->insert(
        [
            'link_id' => $link->id,
            'updated_at' => date('Y-m-d H:i:s'),
            'created_at' => date('Y-m-d H:i:s')
        ]
    );

    return redirect($link->original_link);
});