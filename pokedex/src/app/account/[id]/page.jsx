'use client'

import { getDataTreinador, logoutTreinador } from "@/lib/api";
import { use, useEffect, useState } from "react";

export default function Account({ params }){

    const { id } = use(params);
    const [nome, setNome] = useState('')

    async function findUser() {
        console.log(id)
        const data = await getDataTreinador(id)
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
            <br /><br /><br /><br /><br /><br /><br /><br />

            <h1>Welcome, {nome}</h1>

            <h3>I mean, there's nothing on this page yet, but that's some good progress!!</h3>

            <button className="login-exibir" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
        </div>
    )
}