<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Tempat;

class TempatController extends Controller
{
    public function index(Request $request)
    {
        $data = new Tempat();

        $data = $data->select(
            'tempat.*',
            DB::raw('jenis.nama as jenis_nama')
        )->leftJoin(
            'jenis', 'jenis.id', '=', 'tempat.jenis_id'
        );

        if ($request->jenis_id) {
            $data = $data->where('jenis_id', '=', $request->jenis_id);
        }

        if ($request->kecamatan) {
            $data = $data->where('kecamatan', 'LIKE', "%$request->kecamatan%");
        }

        if ($request->kelurahan) {
            $data = $data->where('kelurahan', 'LIKE', "%$request->kelurahan%");
        }

        $recordsTotal = count($data->get());
        $pagesTotal = $request->limit ? ceil($recordsTotal / $request->limit) : 0;

        if ($limit = $request->limit) {
            $data = $data->limit($limit)
            ->offset($request->page ? $request->page * $limit - $limit : 0);
        }

        if ($search = $request->search) {
            $data = $data->where('nama', 'LIKE', "%$search%")
            ->orWhere('penanggung_jawab', 'LIKE', "%$search%")
            ->orWhere('jenis_nama', 'LIKE', "%$search%");
        }

        $tempat = $data->orderBy('nama', 'asc')->get();

        return [
            'error' => false,
            'data' => $tempat,
            'recordsTotal' => $recordsTotal,
            'pagesTotal' => $pagesTotal
        ];
    }

    public function show($id)
    {
        $tempat = Tempat::find($id);

        if ($tempat) {
            $tempat['longlat'] = explode(',', str_replace(' ', '', $tempat['lokasi']));
        }

        return [
            'error' => false,
            'data' => $tempat
        ];
    }

    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), Tempat::rules());

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        $data = $validation->validated();

        if ($request->foto) {
            $foto = explode(';base64,', $request->foto)[1];
            $foto_nama = $this->random(32) . '.jpeg';
            
            if (file_put_contents(public_path('/img/tempat/' . $foto_nama), base64_decode($foto))) {
                $data['foto'] = $foto_nama;
            } else {
                return [
                    'error' => true,
                    'message' => "terjadi kesalahan upload foto"
                ];
            }
        }

        $tempat = Tempat::create($data);

        return [
            'error' => false,
            'message' => "tempat ibadah berhasil ditambah",
            'data' => $tempat
        ];
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make($request->all(), Tempat::rules());

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        $tempat = Tempat::find($id);
        $data = $validation->validated();

        if ($request->foto) {
            $foto = explode(';base64,', $request->foto)[1];
            $foto_nama = $this->random(32) . '.jpeg';
            
            if (file_put_contents(public_path('/img/tempat/' . $foto_nama), base64_decode($foto))) {
                $data['foto'] = $foto_nama;
                if ($tempat->foto) {
                    unlink(public_path('/img/tempat/' . $tempat->foto));
                }
            } else {
                return [
                    'error' => true,
                    'message' => "terjadi kesalahan upload foto"
                ];
            }
        }
        $tempat->update($data);

        return [
            'error' => false,
            'message' => "tempat ibadah berhasil diedit",
            'data' => $tempat
        ];
    }

    public function destroy($id)
    {
        $tempat = Tempat::find($id);
        
        if ($tempat->foto) {
            unlink(public_path('/img/tempat/' . $tempat->foto));
        }
        
        $tempat->delete();

        return [
            'error' => false,
            'message' => "tempat ibadah berhasil dihapus"
        ];
    }

    public function getColumn($column)
    {
        $data = Tempat::select($column)->groupBy($column)->orderBy($column, 'asc')->get();

        return [
            'error' => false,
            'data' => $data
        ];
    }
}
