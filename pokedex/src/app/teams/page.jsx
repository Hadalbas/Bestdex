'use client'

import { getTeams } from "@/lib/api"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react"
import "./teams.css"
import "./../globals.css"
import DisplayTeamsPokemon from "@/components/DisplayTeamsPokemon";
import Link from "next/link";

export default function Teams() {

    const [teams, setTeams] = useState([])
    const [search, setSearch] = useState('')

    function checkTeamForPokemon(team) {
        console.log(`Search: ${search}`)
        for (const pokemon of team) {
            if (pokemon.species.toLowerCase().includes(search.trim().toLowerCase())) {
                return true
            }
        }
        return false
    }

    async function showTeams() {
        const { data } = await getTeams()

        setTeams(data)

        console.log(data)
    }

    useEffect(() => {
        showTeams()
    }, [])

    return (
        <div className="teams-page">
            <Header />

            <main className="teams-main">
                <section className="teams-content">
                    <div className="teams-header">
                        <h1>Teams uploaded to Bestdex:</h1>
                    </div>

                    <section className="search-section">
                        <div className="search-container">
                            <div className="search-filter">
                                <h2>Search:</h2>
                                <input className="search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for teams" />
                            </div>

                        </div>
                    </section>

                    <div className="community-teams-container">

                        {teams?.length > 0 ? (
                            teams.filter((team) => search ? team.criador.toLowerCase().includes(search.trim().toLowerCase()) || team.nome.toLowerCase().includes(search.trim().toLowerCase()) || checkTeamForPokemon(team.pokemons) : true).map((team, i) => (
                                team.pokemons.length == 6 &&(
                                <article key={i} className="community-team-cards">
                                    <div className="team-card-header">
                                        <div className="team-creator">
                                            <p className="team-name">{team.nome}</p>
                                            <section className="team-accesses">
                                                <p className="team-interactions" style={{ margin: 0 }}>{team.acessos / 2} accesses</p>
                                                <p className="team-user">By: {team.criador}</p>
                                            </section>
                                            <div className="card-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-team">
                                        <div className="pokemon-team-main-container">
                                            {team.pokemons.map((pokemon, Pi) => (
                                                <DisplayTeamsPokemon
                                                    key={parseInt(Pi) * 1000 + '' + Pi}
                                                    nome={pokemon.species}
                                                    stats={[
                                                        pokemon.stats?.hp ?? 0,
                                                        pokemon.stats?.at ?? 0,
                                                        pokemon.stats?.df ?? 0,
                                                        pokemon.stats?.sa ?? 0,
                                                        pokemon.stats?.sd ?? 0,
                                                        pokemon.stats?.sp ?? 0,
                                                    ]}
                                                    showHeader={false}
                                                    showStats={false}
                                                />
                                            ))
                                            }
                                        </div>
                                    </div>
                                    <Link className="btn btn-primary" href={'/teams/' + team._id} role="button">Show Team</Link>
                                </article>)
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}