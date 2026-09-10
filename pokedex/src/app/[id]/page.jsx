'use client'

import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function Mostrar({ params }){

    const [pokemon, setPokemon] = useState({});

    async function getData() {
        const { id } = await params;
        const data = await api.get('/pokedex.json');
        setPokemon(data[id.toLowerCase()]);
        console.log(data)
        console.log(id)
        console.log(pokemon)
    }
    
    useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <h1>{pokemon?.name}</h1>
        </>
    )
}