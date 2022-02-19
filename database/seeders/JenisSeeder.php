<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Jenis;

class JenisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Jenis::where(DB::raw('1'), '=', '1')->delete();

        $jenis = [
            'Masjid',
            'Gereja',
            'Vihara',
            'Waisa'
        ];

        for ($i=0; $i < count($jenis); $i++) { 
            Jenis::create([
                'nama' => $jenis[$i]
            ]);
        }
    }
}
