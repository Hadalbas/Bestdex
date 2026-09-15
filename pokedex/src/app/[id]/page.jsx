'use client'

import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
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
                <h2>Base stats</h2>
                <h4><label htmlFor="hp">Health: {pokemon?.baseStats?.hp} </label>
                <meter id="hp" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.hp / 255}/></h4>
                <h4><label htmlFor="atk">Attack: {pokemon?.baseStats?.atk} </label>
                <meter id="atk" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.atk / 255} /></h4>
                <h4><label htmlFor="def">Defense: {pokemon?.baseStats?.def} </label>
                <meter id="def" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.def / 255} /></h4>
                <h4><label htmlFor="spa">Special Attack: {pokemon?.baseStats?.spa} </label>
                <meter id="spa" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.spa / 255} /></h4>
                <h4><label htmlFor="spd">Special Defense: {pokemon?.baseStats?.spd} </label>
                <meter id="spd" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.spd / 255} /></h4>
                <h4><label htmlFor="spe">Speed: {pokemon?.baseStats?.spe} </label>
                <meter id="spe" min={0} max={1} low={0.4} high={0.8} value={pokemon?.baseStats?.spe / 255} /></h4>
            </div>

            <h2>Abilities</h2>

            <br />

            <Link href="/"><button className="exibir">Voltar</button></Link>
        </>
    )
}