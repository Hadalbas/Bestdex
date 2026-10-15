'use client'

import { getDataTreinador, logoutTreinador } from "@/lib/api";
import { useEffect, useState } from "react";
import './profile.css'
import Footer from "@/components/Footer";

export default function Account(){

    const [name, setName] = useState('')

    async function findUser() {
        const data = await getDataTreinador(document.cookie.substring(6))
        setName(data.data.nome)
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
                            <h1 className="welcome">Welcome,<br />{name}</h1>
                            {/* <>Foto de perfil ou icone simples</> */}
                            <div className="pfp-mockup"></div> {/* mockup */}
                            {/* <>User Status? Como vitórias, derrotas, etc.</> */}
                            <div className="stats-mockup"> {/* mockup */}
                                <div><p>Battles:<br/><span>0</span></p></div>
                                <div><p>Victories:<br/><span>0</span></p></div>
                                <div><p>Defeats:<br/><span>0</span></p></div>
                            </div>
                        </div>
                        <div className="pokemon-team-main-container">
                            {/* <TimePokemon /> */}
                            
                                    <div className="card-container"> {/* mockup */} 
                                        <div className="card-content-container">Pikachu</div>
                                        <div className="card-content-container">Bulbasaur</div>
                                        <div className="card-content-container">Charizard</div>
                                        <div className="card-content-container">Blastoise</div>
                                        <div className="card-content-container">Caterpie</div>
                                        <div className="card-content-container">Beedrill</div>
                                        <div className="card-content-container add-pokemon">Add Pokémon</div>
                                    </div>
                                
                        </div>
                        </section>
        
                        <button className="login-exibir logout" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                    </div>
                    <Footer />
                </div>
    )
}