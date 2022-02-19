<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Tempat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tempat', function(Blueprint $table) {
            $table->id();
            $table->string('nama', 50);
            $table->string('kecamatan', 50);
            $table->string('kelurahan', 50);
            $table->text('alamat_lengkap');
            $table->string('penanggung_jawab', 50);
            $table->string('penanggung_jawab_2', 50)->nullable();
            $table->string('foto', 50)->nullable();
            $table->text('lokasi');
            
            $table->bigInteger('jenis_id')->unsigned();
            $table->foreign('jenis_id', 'tempat_jenis_id')->on('jenis')->references('id');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
