<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Automovel extends Model
{
    use HasFactory;

    protected $fillable = [
        'modelo',
        'ano',
        'cor',
        'placa',
        'user_id',
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
