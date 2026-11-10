'use client'

import { getTeams } from "@/lib/api"
import Footer from "@/components/Footer";
import Header from "@/components/Header(READ)";
import { useEffect, useState } from "react"
import "./teams.css"
import "./../globals.css"

export default function Teams() {

    const [teams, setTeams] = useState([])

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
                        <h1>Teams uploaded to this site:</h1>
                    </div>

                    <div className="community-teams-container">
                        {teams?.length > 0 ? (
                            teams.map((team, i) => (
                                <article key={i} className="community-team-cards">
                                    <div className="team-card-header">
                                        <div className="team-creator">
                                            <p className="team-name">{team.nome}</p>
                                            <p className="team-creator">By: {team.criador}</p>
                                        </div>
                                    </div>
                                    <div className="user-team"></div>
                                </article>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}