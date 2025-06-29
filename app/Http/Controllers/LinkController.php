<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Requests\CreateLinkRequest;
use App\Models\Link;
use App\Services\LinkService;
use App\Http\Resources\Inertia\LinkResource;

class LinkController extends Controller
{
    private string $accessSessionKeyPrefix = 'access_granted.';

    public function __construct(protected LinkService $linkService)
    {
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render('Index');
    }

    public function store(CreateLinkRequest $request)
    {
        $linkData = collect($request->only('type', 'text', 'access_limit', 'expires_at', 'public', 'password'));

        $linkData->put('file', $request->file('file'));

        $link = $this->linkService->generateLink($linkData);
        return back()->with('message', ['url' => route('links.show', ['link' => $link->slug])]);
    }

    public function show(Link $link): \Inertia\Response
    {
        $canAccess = $this->linkService->canAccess($link);

        abort_unless($canAccess, 403);
        if (!$link->password || session()->has($this->accessSessionKeyPrefix . $link->slug)) {
            $link->recordAccess();
        }

        return Inertia::render('Show', ['link' => LinkResource::make($link)]);
    }

    public function spotlight(): \Inertia\Response
    {
        $links = Link::query()
            ->file()
            ->public()
            ->orderBy('access_count', 'desc')
            ->paginate(25);

        return Inertia::render('Spotlight', ['links' => LinkResource::collection($links)]);
    }

    public function verifyPassword(Request $request, Link $link): \Illuminate\Http\RedirectResponse
    {
        if (!Hash::check($request->password, $link->password)) {
            return back()->withErrors(['password' => 'Invalid password']);
        }

        session()->put($this->accessSessionKeyPrefix . $link->slug, true);

        return redirect()->route('links.show', $link->slug);
    }

}
