<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recipe extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'main_photo_url',
        'category_id',
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category() : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function steps() : HasMany
    {
        return $this->hasMany(Step::class);
    }

    public function ingredients() : HasMany
    {
        return $this->hasMany(Ingredient::class);
    }
}
