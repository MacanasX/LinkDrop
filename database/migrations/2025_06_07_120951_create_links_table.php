<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Enums\LinkType;
use App\Models\User;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('type')->default(LinkType::Text->value);
            $table->unsignedInteger('access_limit')->nullable();
            $table->unsignedInteger('access_count')->default(0);
            $table->date('expires_at')->nullable();
            $table->boolean('public')->default(false);
            $table->string('password')->nullable();
            $table->string('slug')->unique();
            $table->longText('data')->nullable();
            $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
