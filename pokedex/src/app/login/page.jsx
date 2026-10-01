'use client'

import { useState } from "react"
import './login.css'
import HideHeader from '@/components/HideHeader'

export default function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function submit() {
        alert(name + password)
    }
    return (
        <>
            <HideHeader />
            <div className="main-page">

                <div className="login-container">
                    <div className="login-banner-container"></div>
                    <div className="login-input">
                        <h1>LOG IN</h1>
                        
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name" placeholder="Email or Username"/>
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" placeholder="Password"/>
                        
                        <br />
                        
                        <button onClick={submit} className="login-exibir">Create account</button>
                    </div>
                </div>
            
            </div>
        </>
    )
}