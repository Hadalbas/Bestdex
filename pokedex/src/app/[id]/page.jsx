'use client'

import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react"

export default function Pokemon({ params }) {

    const { id } = use(params);
    const name = id.toLowerCase().replace("-", "");
    const [pokemon, setPokemon] = useState({});
    const [numero, setNumero] = useState(0)
    const [evoNumero, setEvoNumero] = useState(0)
    const [prevoNumero, setPrevoNumero] = useState(0)

    async function getPokemon() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        //data[name]?.evos.length > 0 && setEvo(data[pokemon?.evos[0]])
        setNumero(data[name].num.toString().padStart(3, "0"))
        setEvoNumero((data[name].num + 1).toString().padStart(3, "0"))
        setPrevoNumero((data[name].num - 1).toString().padStart(3, "0"))
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
                    <meter id="hp" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.hp / 255).toString()} /></h4>
                <h4><label htmlFor="atk">Attack: {pokemon?.baseStats?.atk} </label>
                    <meter id="atk" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.atk / 255).toString()} /></h4>
                <h4><label htmlFor="def">Defense: {pokemon?.baseStats?.def} </label>
                    <meter id="def" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.def / 255).toString()} /></h4>
                <h4><label htmlFor="spa">Special Attack: {pokemon?.baseStats?.spa} </label>
                    <meter id="spa" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.spa / 255).toString()} /></h4>
                <h4><label htmlFor="spd">Special Defense: {pokemon?.baseStats?.spd} </label>
                    <meter id="spd" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.spd / 255).toString()} /></h4>
                <h4><label htmlFor="spe">Speed: {pokemon?.baseStats?.spe} </label>
                    <meter id="spe" min={0} max={1} low={0.2} high={0.5} optimum={1} value={(pokemon?.baseStats?.spe / 255).toString()} /></h4>
            </div>

            <br />

            <h2>Abilities</h2>
            <h4>Normal: {pokemon?.abilities ? pokemon?.abilities["0"] : "carregando"}  {pokemon?.abilities && pokemon?.abilities["1"]}</h4>

            {
                pokemon?.abilities?.H && <h4>Hidden: {pokemon?.abilities?.H}</h4>
            }

            <br />

            {
                pokemon?.prevo
                    ? <div className={`detalhePokemon`}>
                        <Link href={pokemon?.prevo}>
                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${prevoNumero}.png`} width={150} height={150} alt="XXX"></Image>

                            <div className="detalhePokemon-data">
                                <h2>#{pokemon.num - 1}</h2>
                                <h2>{pokemon?.prevo}</h2>
                            </div>
                        </Link>
                    </div>

                    : <p>No evolution</p>
            }
            
            {
                pokemon?.evos
                    ? <div className={`detalhePokemon`}>
                        <Link href={pokemon?.evos[0]}>
                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${evoNumero}.png`} width={150} height={150} alt="XXX"></Image>

                            <div className="detalhePokemon-data">
                                <h2>#{pokemon.num + 1}</h2>
                                <h2>{pokemon?.evos[0]}</h2>
                            </div>
                        </Link>
                    </div>

                    : <p>No evolution</p>
            }

            <br />

            <Link href="/"><button className="exibir">Voltar</button></Link>
        </>
    )
}