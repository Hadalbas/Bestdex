'use client'

import "./teamDetail.css"
import "../../globals.css"
import { use, useEffect, useState } from "react"
import Header from "@/components/Header(READ)"
import Footer from "@/components/Footer"
import { getTeams } from "@/lib/api"
import ShowTeamPokemon from "@/components/ShowTeamPokemon"
import Link from "next/link"

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
            <div className="main-page">
                <Header />

            
                <section>
                    <div className="team-section-header">
                        <h1>{team.nome}</h1>
                        <h2>Created by: {team.criador}</h2>
                    </div>
                    
                    <div className="user-team-details">
                        {team?.pokemons?.length > 0 ? (team.pokemons.map((pokemon, i) => (
                            <ShowTeamPokemon
                                key={i.toString()}
                                nome={pokemon.species}
                                stats={[
                                    pokemon.stats?.hp ?? 0,
                                    pokemon.stats?.at ?? 0,
                                    pokemon.stats?.df ?? 0,
                                    pokemon.stats?.sa ?? 0,
                                    pokemon.stats?.sd ?? 0,
                                    pokemon.stats?.sp ?? 0,
                                ]}
                                ability={pokemon.ability}
                                moves={pokemon.moves}
                                nature={pokemon.nature}
                            />
                        )))
                            : <p>Loading Team...</p>}
                    </div>
                </section>
                
                <Link href="/teams"><button className="exibir">Back</button></Link>
                
                
                <Footer />
            </div>
        </div >
    )
}