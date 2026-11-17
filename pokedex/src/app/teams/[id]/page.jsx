'use client'

import "../teams.css"
import "../../globals.css"
import { use, useEffect, useState } from "react"
import Header from "@/components/Header(READ)"
import Footer from "@/components/Footer"
import { getTeams } from "@/lib/api"
import DisplayTeamsPokemon from "@/components/DisplayTeamsPokemon"

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

            {team.pokemons.length > 0 ? (team.pokemons.map((pokemon, i) => (
                <DisplayTeamsPokemon
                    key={parseInt(i) * 1000 + '' + i}
                    nome={pokemon.species}
                    stats={[
                        pokemon.stats?.hp ?? 0,
                        pokemon.stats?.at ?? 0,
                        pokemon.stats?.df ?? 0,
                        pokemon.stats?.sa ?? 0,
                        pokemon.stats?.sd ?? 0,
                        pokemon.stats?.se ?? 0,
                    ]}
                    showHeader={false}
                    showStats={false}
                />
            )))
        : <p>Loading Team...</p>}


            <Footer />
        </div >
    )
}