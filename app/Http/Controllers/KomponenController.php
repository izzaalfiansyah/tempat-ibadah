<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class KomponenController extends Controller
{
    public function provinsi($id = null)
    {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => 'http://api.rajaongkir.com/starter/province' . ($id ? '?id=' . $id : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'key: ' . env('RAJAONGKIR_KEY')
            ],
            CURLOPT_CUSTOMREQUEST => 'GET'
        ]);
        
        $result = curl_exec($ch);
        curl_close($ch);

        return [
            'error' => false,
            'data' => json_decode($result, true)['rajaongkir']['results']
        ];
    }

    public function kota(Request $request, $id = null)
    {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => 'http://api.rajaongkir.com/starter/city' . ($id ? '?id=' . $id : '') . ($request->provinsi_id ? '?province=' . $request->provinsi_id : ''),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'key: ' . env('RAJAONGKIR_KEY')
            ],
            CURLOPT_CUSTOMREQUEST => 'GET'
        ]);
        
        $result = curl_exec($ch);
        curl_close($ch);

        return [
            'error' => false,
            'data' => json_decode($result, true)['rajaongkir']['results']
        ];
    }
}
