<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\Inertia\LinkHistory;

class ProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function deleteProfile(Request $request): \Illuminate\Http\RedirectResponse
    {
        $user = $request->user();
        $deleteLinks = $request->query('deleteLinks', false);

        if ($deleteLinks) {
            $user->links()->delete();
        }
        $user->delete();

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('home')->with('message', ['auth' => 'Your account has been deleted.']);
    }

    public function profile(): \Inertia\Response
    {
        $linkHistory = request()->user()->linkHistory()->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Profile', ['linkHistory' => LinkHistory::collection($linkHistory)]);
    }
}
