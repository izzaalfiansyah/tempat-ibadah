<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public $user;

    public function __construct()
    {
        $this->user = json_decode(file_get_contents(public_path('/app.json'), false, stream_context_create([
            'ssl' => [
                'verify' => false,
                'verify_peer' => false
            ]
        ])));
    }

    public function index()
    {
        return [
            'error' => false,
            'data' => $this->user
        ];
    }

    public function save(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'username' => 'required|min:5|max:20',
            'email' => 'required|email',
            'telepon' => 'required|numeric'
        ]);

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        $data = $validation->validated();
        $data['password'] = $this->user->password;

        file_put_contents(public_path('/app.json'), json_encode($data));

        return [
            'error' => false,
            'message' => "data berhasil disimpan"
        ];
    }

    public function password(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'password_lama' => 'required',
            'password_baru' => 'required|min:8|max:16'
        ]);

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        if (Hash::check($request->password_lama, $this->user->password)) {
            $data = $this->user;
            $data->password = Hash::make($request->password_baru);

            file_put_contents(public_path('/app.json'), json_encode($data));

            return [
                'error' => false,
                'message' => "password berhasil diganti"
            ];
        } else {
            return [
                'error' => true,
                'message' => "password salah"
            ];
        }
    }

    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validation->fails()) {
            return [
                'error' => true,
                'message' => $validation->errors()->first()
            ];
        }

        if ($request->username == $this->user->username) {
            if (Hash::check($request->password, $this->user->password)) {
                return [
                    'error' => false,
                    'message' => "berhasil login",
                    'data' => $this->user
                ];
            } else {
                return [
                    'error' => true,
                    'message' => "password salah"
                ];
            }
        } else {
            return [
                'error' => true,
                'message' => "username salah"
            ];
        }
    }
}
