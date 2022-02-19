<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tempat extends Model
{
    use HasFactory;

    public $table = 'tempat';

    public $fillable = [
        'nama',
        'kecamatan',
        'kelurahan',
        'penanggung_jawab',
        'penanggung_jawab_2',
        'foto',
        'lokasi',
        'jenis_id',
        'alamat_lengkap'
    ];

    public static function rules() {
        return [
            'nama' => 'required|max:50',
            'jenis_id' => 'required|integer',
            'kecamatan' => 'required|max:50',
            'kelurahan' => 'required|max:50',
            'penanggung_jawab' => 'required|max:50',
            'penanggung_jawab_2' => 'nullable|max:50',
            'foto' => 'nullable',
            'lokasi' => 'required',
            'alamat_lengkap' => 'required'
        ];
    }
}
