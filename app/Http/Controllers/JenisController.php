<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Jenis;

class JenisController extends Controller
{
    public function index()
    {
        $jenis = Jenis::orderBy('nama', 'asc')->get();

        return [
            'error' => false,
            'data' => $jenis
        ];
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), Jenis::rules());

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        $data = $validation->validated();
        $jenis = Jenis::create($data);

        return [
            'error' => false,
            'message' => "kategori berhasil disimpan",
            'data' => $jenis
        ];
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), Jenis::rules());

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        $data = $validation->validated();
        $jenis = Jenis::find($id);
        $jenis->update($data);

        return [
            'error' => false,
            'message' => "kategori berhasil diedit",
            'data' => $jenis
        ];
    }

    public function destroy($id)
    {
        Jenis::destroy($id);

        return [
            'error' => false,
            'message' => "kategori berhasil dihapus"
        ];
    }
}
