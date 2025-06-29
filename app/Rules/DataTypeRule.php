<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DataTypeRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Accept if it's a string
        if (is_string($value)) {
            return;
        }

        // Accept if it's a file and size <= 50MB
        if (request()->hasFile($attribute)) {
            $file = request()->file($attribute);
            if ($file->getSize() <= 50 * 1024 * 1024) {
                return;
            }
        }

        // Fail if none of the above conditions are met
        $fail('The ' . $attribute . ' must be a text or a file not exceeding 50MB.');
    }
}
