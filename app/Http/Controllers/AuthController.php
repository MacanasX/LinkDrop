<?php

namespace App\Http\Controllers;


use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function loginForm(): \Inertia\Response
    {
        return Inertia::render('Auth/Login');
    }

    public function registerForm(): \Inertia\Response
    {
        return Inertia::render('Auth/Register');

    }

    public function logout(Request $request): \Illuminate\Http\RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('home');
    }

    public function register(RegisterRequest $request): \Illuminate\Http\RedirectResponse
    {
        $userData = $request->validated();

        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => $userData['password'],
        ]);

        Auth::login($user);

        return redirect()->route('home')->with('message', ['auth' => 'Account created successfully!']);


    }

    public function login(LoginRequest $request): \Illuminate\Http\RedirectResponse
    {
        $credentials = $request->validated();

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            return redirect()
                ->route('home')
                ->with('message', ['auth' => "Welcome back, {$user->name}!"]);
        }

        return back()
            ->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])
            ->onlyInput('email');
    }

    public function deleteAccount()
    {
    }
}
