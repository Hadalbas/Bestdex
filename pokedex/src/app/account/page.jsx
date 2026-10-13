'use client'

import { getDataTreinador, logoutTreinador } from "@/lib/api";
import { useEffect, useState } from "react";
import './profile.css'
import Footer from "@/components/Footer";

export default function Account(){

    const [nome, setNome] = useState('')

    async function findUser() {
        const data = await getDataTreinador(document.cookie.substring(6))
        setNome(data.data.nome)
    }

    async function handleLogout() {
        await logoutTreinador();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.replace('/')
    }

    useEffect(()=>{
        findUser()
    }, []);

    return(
        <div className="main-page">
                    <div className="profile-main">
                        <section className="sidebar-team-container">
                        <div className="sidebar">
                            <h1 className="welcome">Welcome,<br />(Username)</h1>
                            {/* <>Foto de perfil ou icone simples</> */}
                            <div className="pfp-mockup"></div>
                            {/* <>User Status? Como vitórias, derrotas, etc.</> */}
                            <div className="stats-mockup">
                                <div>
                                    <p>Battles: <br /> <span>0</span></p>
                                </div>
                                <div>
                                    <p>Victories: <br /> <span>0</span></p>
                                </div>
                                <div>
                                    <p>Defeats: <br /> <span>0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="pokemon-team-main-container">
                            {/* <TimePokemon /> */}
                        </div>
                        </section>
        
                        <button className="login-exibir logout" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                    </div>
                    <Footer />
                </div>
    )
}