'use client'

import { getTeams } from "@/lib/api"
import Footer from "@/components/Footer";
import Header from "@/components/Header(READ)";
import { useEffect, useState } from "react"

export default function Teams() {

    const [teams, setTeams] = useState([])

    async function showTeams() {
        const {data} = await getTeams()

        setTeams(data)

        console.log(data)
    }

    useEffect(() => {
        showTeams()
    }, [])

    return (
        <div className="main-page">
            <Header />
            <div className="profile-main">
                <h1>Teams uploaded to this site:</h1>

                {teams?.length > 0
                    ? teams.map((team, i) => <div key={i}> <p>{team.nome}</p> <p>By: {team.criador}</p> <br /></div>)
                    : <li>Loading...</li>
                }

            </div>
            <Footer />
        </div>
    )
}