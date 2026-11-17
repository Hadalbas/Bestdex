'use client'

import "../teams.css"
import "../../globals.css"
import { use, useEffect, useState } from "react"
import Header from "@/components/Header(READ)"
import Footer from "@/components/Footer"
import { getTeams } from "@/lib/api"
import ShowTeamPokemon from "@/components/ShowTeamPokemon"

export default function ShowTeam({ params }) {

    const { id } = use(params)

    const [team, setTeam] = useState([])

    async function getTeam() {
        const { data } = await getTeams()
        setTeam(data[id])

        console.log(data[id])
    }

    useEffect(() => {
        getTeam()
    }, [])

    return (
        <div className="teams-page">
            <Header />

            <h1>{team.nome}</h1>
            <h2>Created by: {team.criador}</h2>

            {team?.pokemons?.length > 0 ? (team.pokemons.map((pokemon, i) => (
                <ShowTeamPokemon
                    key={i.toString()}
                    nome={pokemon.species}
                    stats={[
                        pokemon.stats?.hp ?? 0,
                        pokemon.stats?.atk ?? 0,
                        pokemon.stats?.def ?? 0,
                        pokemon.stats?.spa ?? 0,
                        pokemon.stats?.spd ?? 0,
                        pokemon.stats?.spe ?? 0,
                    ]}
                />
            )))
                : <p>Loading Team...</p>}


            <Footer />
        </div >
    )
}