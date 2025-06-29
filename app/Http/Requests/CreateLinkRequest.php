<?php

namespace App\Http\Requests;

use App\Enums\LinkType;
use App\Rules\DataTypeRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CreateLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', Rule::enum(LinkType::class)],
            'file' => ['nullable', 'required_if:type,file'],
            'text' => ['nullable', 'required_if:type,text'],
            'access_limit' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:' . now()->addDay()->format('Y-m-d')],
            'public' => ['nullable', 'boolean'],
            'password' => ['nullable', 'string', 'min:5'],
        ];
    }
}
