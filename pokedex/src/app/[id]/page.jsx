'use client'

import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react"

export default function Pokemon({ params }) {

    const { id } = use(params);
    const name = id.toLowerCase().replace("-", "");
    const [pokemon, setPokemon] = useState({});
    const [evolution, setEvolution] = useState({});
    const [prevolution, setPrevolution] = useState({});
    const [number, setNumber] = useState(0)
    const [evoNumber, setEvoNumber] = useState(0)
    const [prevoNumber, setPrevoNumber] = useState(0)

    async function getPokemon() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumber(data[name].num.toString().padStart(3, "0"))

        if (data[name]?.evos != undefined) {
            setEvolution(data[data[name]?.evos[0].toLowerCase()]);
            setEvoNumber((data[data[name]?.evos[0].toLowerCase()].num).toString().padStart(3, "0"))
        }
        if (data[name]?.prevo != undefined) {
            setPrevolution(data[data[name]?.prevo.toLowerCase()]);
            setPrevoNumber((data[data[name]?.prevo.toLowerCase()].num).toString().padStart(3, "0"))
        }
    }

    console.log(evolution);
    console.log(prevolution);
    console.log(pokemon);

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <>
            <h2>#{pokemon?.num}</h2>
            <h1>{pokemon.name}</h1>

            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}.png`} width={300} height={300} alt="XXX"></Image>

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

            <h2>Evolution Line:</h2>

            {
                pokemon?.prevo
                    ? <div className={`detalhePokemon`}>
                        <Link href={pokemon?.prevo}>
                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${prevoNumber}.png`} width={150} height={150} alt="XXX"></Image>

                            <div className="detalhePokemon-data">
                                <h2>#{prevolution.num}</h2>
                                <h2>{pokemon?.prevo}</h2>
                            </div>
                        </Link>
                    </div>

                    : <p>No prevolution</p>
            }

            {
                pokemon?.evos
                    ? <div className={`detalhePokemon`}>
                        <Link href={pokemon?.evos[0]}>
                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${evoNumber}.png`} width={150} height={150} alt="XXX"></Image>

                            <div className="detalhePokemon-data">
                                <h2>#{evolution.num}</h2>
                                <h2>{pokemon?.evos[0]}</h2>
                            </div>
                        </Link>
                    </div>

                    : <p>No evolution</p>
            }

            <br />

            <Link href="/"><button className="exibir">Back</button></Link>
        </>
    )
}