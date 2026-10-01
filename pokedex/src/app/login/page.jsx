'use client'

import { useState } from "react"

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        alert(name + password)
    }
    return (
        <>
            <div className="main-page">
                <br /><br /><br /><br />
                <br /><br /><br /><br />

                <h1>Log into Bestdex to have access to your account</h1>

                <label htmlFor="name">Username</label><input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name" />
                <label htmlFor="password">Password</label><input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" />

                <br />
                
                <button onClick={submit} className="exibir">Create account</button>
            
            </div>
        </>
    )
}