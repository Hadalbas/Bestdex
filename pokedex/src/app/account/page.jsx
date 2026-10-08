'use client'

import { logoutTreinador } from "@/lib/api";

export default function Account(){

    async function handleLogout() {
        await logoutTreinador();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.replace('/')
    }
    return(
        <div className="main-page">
            <br /><br /><br /><br /><br /><br /><br /><br />

            <h1>Welcome</h1>

            <h3>I mean, there's nothing on this page yet, but that's some good progress!!</h3>

            <button className="login-exibir" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
        </div>
    )
}