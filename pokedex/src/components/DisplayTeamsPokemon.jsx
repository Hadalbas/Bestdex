'use client'

import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DisplayTeamsPokemon({ name, stats = [] }) {

    const [hp, atk, def, spa, spd, spe] = stats;

    const [pokemon, setPokemon] = useState({});
    const [number, setNumber] = useState("132")

    async function getPokemon() {
        console.log(name)
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumber(data[name].num.toString().padStart(3, "0"))

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
                <Image src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}.png`} width={70} height={70} alt={name + "_image"} />

                </div>

                <div className="pokemon-stats-list">
                    <span>HP:  <strong>{hp}</strong></span>
                    <span>ATK: <strong>{atk}</strong></span>
                    <span>DEF: <strong>{def}</strong></span>
                    <span>SPA: <strong>{spa}</strong></span>
                    <span>SPD: <strong>{spd}</strong></span>
                    <span>SPE: <strong>{spe}</strong></span>
                </div>

            </div>
        </div>
    );
}
