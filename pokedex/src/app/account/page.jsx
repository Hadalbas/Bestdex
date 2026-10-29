'use client'

import { getDataTreinador, logoutTreinador } from "@/lib/api";
import { useEffect, useState } from "react";
import './profile.css'
import Footer from "@/components/Footer";
import Header from "@/components/Header(READ)";
import AccountStatCard from "@/components/AccountStatCard";
import AccountPokemonCard from "@/components/AccountPokemonCard";
import EditPokemon from "@/components/EditPokemon";
import { getTeam, removePokemonFromTeam, saveTeam } from "@/lib/teamStorage";
import Link from "next/link";

export default function Account() {

    const [userName, setUserName] = useState('')
    const [teamName, setTeamName] = useState('New Team')
    const [team, setTeam] = useState([])
    const [editingPokemon, setEditingPokemon] = useState('')
    const [focusPokemon, setFocusPokemon] = useState({})

    const [response, setResponse] = useState('')

    const trainerStats = [
        { label: 'Battles', value: 0 },
        { label: 'Victories', value: 0 },
        { label: 'Defeats', value: 0 }
    ]

    async function findUser() {
        const data = await getDataTreinador(document.cookie.substring(6))
        setUserName(data.data.nome)
    }

    function loadTeam() {
        setTeam(getTeam())
    }
    function uploadTeam() {
        setResponse(saveTeam(userName, teamName).data?.message)
    }
    function handleRemovePokemon(nameToRemove) {
        removePokemonFromTeam(nameToRemove)
        loadTeam()
    }

    function changeEditingPokemon(pokemon) {
        pokemon && setFocusPokemon(team.find(({ name }) => name === pokemon))
        setEditingPokemon(pokemon)
    }

    async function handleLogout() {
        await logoutTreinador();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.replace('/')
    }

    useEffect(() => {
        findUser()
        loadTeam()

        const handleTeamUpdate = () => loadTeam();
        window.addEventListener('bestdex-team-updated', handleTeamUpdate);

        return () => {
            window.removeEventListener('bestdex-team-updated', handleTeamUpdate);
        }
    }, []);

    return (
        <div className="main-page">
            <Header />
            <div className="profile-main">
                <section className="sidebar-team-container">
                    <aside className="sidebar">
                        <div className="profile-header">
                            <h1 className="welcome">Welcome,<br />{userName || 'Trainer'}</h1>
                        </div>

                        <div className="stats-mockup">
                            {trainerStats.map((stat) => (
                                <AccountStatCard key={stat.label} label={stat.label} value={stat.value} />
                            ))}
                        </div>

                        <div className="profile-summary">
                            <p>Region: Kanto</p>
                            <p>Team: {team.length} Pokémon</p>
                            <p>Rank: Rookie</p>
                        </div>
                    </aside>

                    <div className="pokemon-team-main-container">

                        <label className="team-name-editor"><input id="TeamNamer" type="text" onChange={(e) => {setTeamName(e.target.value)}} value={teamName}/><div className="pen-container"><i className="fa-solid fa-pen"></i></div></label>

                        <div className="card-container">
                            {team.length > 0 ? team.map((pokemon) => (
                                <AccountPokemonCard
                                    key={pokemon.id || pokemon.name}
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    stats={[
                                        pokemon.baseStats?.hp ?? 0,
                                        pokemon.baseStats?.atk ?? 0,
                                        pokemon.baseStats?.def ?? 0,
                                        pokemon.baseStats?.spa ?? 0,
                                        pokemon.baseStats?.spd ?? 0,
                                        pokemon.baseStats?.spe ?? 0,
                                    ]}
                                    onRemove={() => handleRemovePokemon(pokemon.name)}
                                    changeEditingPokemon={() => changeEditingPokemon(pokemon.name)}
                                />
                            )) : <div className="card-content-container empty-team">No Pokémon in your team yet.</div>}

                            {team.length < 6 && (
                                <Link href="/" className="card-content-container add-pokemon">
                                    Add Pokémon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </Link>
                            )}

                        </div>
                    </div>


                </section>

                {editingPokemon
                    ? <EditPokemon
                        name={focusPokemon.name}
                        image={focusPokemon.image}
                        stats={[
                            focusPokemon.baseStats?.hp ?? 0,
                            focusPokemon.baseStats?.atk ?? 0,
                            focusPokemon.baseStats?.def ?? 0,
                            focusPokemon.baseStats?.spa ?? 0,
                            focusPokemon.baseStats?.spd ?? 0,
                            focusPokemon.baseStats?.spe ?? 0
                        ]}
                        changeEditingPokemon={() => changeEditingPokemon('')} 
                        />
                    : <></>}

                <p>{response}</p>

                    <button className="publish-button" onClick={uploadTeam}>Publish Team</button>

                <button className="login-exibir logout" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
            </div>
            <Footer />
        </div>
    )
}