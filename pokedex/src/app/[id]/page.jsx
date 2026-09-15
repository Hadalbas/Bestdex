'use client'

import api from "@/lib/api";
import Image from "next/image";
import { useState, useEffect, use } from "react"

export default function Pokemon({ params }) {

    const { id } = use(params);
    const name = id.toLowerCase();
    const [pokemon, setPokemon] = useState({});
    const [numero, setNumero] = useState(0)

    async function getPokemon() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumero(data[name].num.toString().padStart(3, "0"))
    }

    console.log(pokemon);

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <>
            <h2>#{pokemon?.num}</h2>
            <h1>{pokemon.name}</h1>

            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numero}.png`} width={300} height={300} alt="XXX"></Image>

            <div className="stats">
                <p>Health: </p>
                <p>Attack: </p>
                <p>Defense: </p>
                <p>Special Attack: </p>
                <p>Special Defense: </p>
                <p>Speed: </p>
            </div>
        </>
    )
}