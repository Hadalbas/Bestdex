'use client'

import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowTeamPokemon({ nome, stats = [] }) {

    const [hp, atk, def, spa, spd, spe] = stats;

    const name = nome.replace(/-|[.]| /g, '').toLowerCase()
    const [pokemon, setPokemon] = useState({});
    const [baseForme, setBaseForme] = useState({});
    const [number, setNumber] = useState("132")

    async function getPokemon() {
        console.log(name)
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumber(data[name].num.toString().padStart(3, "0"))
        if (data[name]?.baseSpecies != undefined) {
            setBaseForme(data[data[name]?.baseSpecies.toLowerCase().replace(/-|[.]| /g, '')]);
        }
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (
        <div className="card-content-container">
            <div className="card-content">
                <div className="pokemon-card-header">
                    <span className="pokemon-name">{name}</span>
                </div>

                <div className="pokemon-sprite">
                    <Image src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}${(pokemon?.baseSpecies && pokemon.num != 744 && pokemon.num != 133) ? `_f${baseForme.formeOrder.indexOf(pokemon.name) + 1}` : ''}.png`} width={250} height={250} alt={name + "_image"} />
                </div>

                <div className="stats-container">
                        <h2>EVs</h2>
                        <div className="stats">
                            <div className="stat-row">
                                <label htmlFor="hp" className="stat-label">Health: {hp}</label>
                                <meter id="hp" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(hp / 32).toString()} className="stat-meter" />
                            </div>
                            <div className="stat-row">
                                <label htmlFor="atk" className="stat-label">Attack: {atk}</label>
                                <meter id="atk" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(atk / 32).toString()} className="stat-meter" />
                            </div>
                            <div className="stat-row">
                                <label htmlFor="def" className="stat-label">Defense: {def}</label>
                                <meter id="def" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(def / 32).toString()} className="stat-meter" />
                            </div>
                            <div className="stat-row">
                                <label htmlFor="spa" className="stat-label">Special Attack: {spa}</label>
                                <meter id="spa" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(spa / 32).toString()} className="stat-meter" />
                            </div>
                            <div className="stat-row">
                                <label htmlFor="spd" className="stat-label">Special Defense: {spd}</label>
                                <meter id="spd" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(spd / 32).toString()} className="stat-meter" />
                            </div>
                            <div className="stat-row">
                                <label htmlFor="spe" className="stat-label">Speed: {spe}</label>
                                <meter id="spe" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(spe / 32).toString()} className="stat-meter" />
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    );
}
