'use client'

import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DisplayTeamsPokemon({ nome, stats = [], showHeader = true, showStats = true }) {

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
                {showHeader && (
                    <div className="pokemon-card-header">
                        <span className="pokemon-name">{name}</span>
                    </div>
                )}

                <div className="pokemon-sprite">
                    <Image src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}${(pokemon?.baseSpecies && pokemon.num != 25 && pokemon.num != 744 && pokemon.num != 133) ? `_f${baseForme.formeOrder.indexOf(pokemon.name) + 1}` : ""}.png`} width={70} height={70} alt={name + "_image"} />

                </div>

                {showStats && (
                    <div className="pokemon-stats-list">
                        <span>HP:  <strong>{hp}</strong></span>
                        <span>ATK: <strong>{atk}</strong></span>
                        <span>DEF: <strong>{def}</strong></span>
                        <span>SPA: <strong>{spa}</strong></span>
                        <span>SPD: <strong>{spd}</strong></span>
                        <span>SPE: <strong>{spe}</strong></span>
                    </div>
                )}

            </div>
        </div>
    );
}
