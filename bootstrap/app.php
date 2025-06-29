<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (HttpException $exception, Request $request) {
            $statusCode = $exception->getStatusCode();

            if ($statusCode >= 400 && $statusCode < 500) {
                return Inertia::render('Errors/ClientError', ['statusCode' => $statusCode])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }

            if ($statusCode >= 500 && $statusCode < 600) {
                return Inertia::render('Errors/ServerError', ['statusCode' => $statusCode])
                    ->toResponse($request)
                    ->setStatusCode($statusCode);
            }
        });
    })->create();
