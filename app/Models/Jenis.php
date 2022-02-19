<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenis extends Model
{
    use HasFactory;

    public $table = 'jenis';

    public $fillable = ['nama'];

    public $timestamps = false;
    
    public static function rules() {
        return [
            'nama' => 'required|max:20'
        ];
    }
}
