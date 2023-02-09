<?php

namespace App\Http\Controllers;

use App\Models\Automovel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AutomovelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $autos = Automovel::all();

        return Inertia::render(
            'Autos/Index',
            [
                'autos' => $autos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        // return Inertia::render([
        //     'Autos/Create'
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'modelo' => 'required|string',
            'ano' => 'required|string',
            'cor' => 'required|string',
            'placa' => 'required|string',
            'user_id' => 'required',
        ]);

        Automovel::create($request->all());

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Automovel  $automovel
     * @return \Illuminate\Http\Response
     */
    public function show(Automovel $automovel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Automovel  $automovel
     * @return \Illuminate\Http\Response
     */
    public function edit(Automovel $automovel)
    {
        //
        // return Inertia::render([
        //     'Autos/Edit',
        //     [
        //         'auto' => $automovel
        //     ]
        // ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Automovel  $automovel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Automovel $auto)
    {
        //
        $request->validate([
            'modelo' => 'required',
            'ano' => 'required',
            'cor' => 'required',
            'placa' => 'required',
            'user_id' => 'required',
        ]);

        $auto->modelo = $request->modelo;
        $auto->ano = $request->ano;
        $auto->cor = $request->cor;
        $auto->placa = $request->placa;
        $auto->save();
        sleep(1);

        return redirect()->refresh();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Automovel  $automovel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        Automovel::find($id)->delete();
        sleep(1);

        return redirect()->route('dashboard')->with('message', 'Auto removido com sucesso!');
    }
}
