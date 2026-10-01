'use client'

import Link from "next/link"
import { useState } from "react"
import './login.css'
import HideHeader from '@/components/HideHeader'

export default function Login() {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loginFail, setLoginFail] = useState('')

    async function handleLogin() {
        try {
            const response = await api.post('/login', { name, password })
            if (response.status == 200) {
                console.log('Logged in sucessfully! Redirecting...')

                //criar cookie local pq o chrome não deixa o localhost acessar o cookie que vem de ads.osorio.ifrs.edu.br - remover se a página for hospedada num servidor
                const tokenValue = response.data.token || 'usuario_autenticado_remotamente'
                document.cookie = `token=${tokenValue}; path=/; max-age=86400; SameSite=Lax`

                window.location.replace('/account')
            }
        } catch (error) {
            setLoginFail(error.response?.data?.message || "An error occurred")
        }
    }

    function handleKeyUp(e) {
        if (e.key == 'Enter') {
            handleLogin()
        } else if (e.key == 'Escape') {
            if (e.target.id == 'name') setName('')
            if (e.target.id == 'password') setPassword('')
        }
    }

    return (
        <>
            <HideHeader />
            <div className="main-page">

                <h1>Log into Bestdex to have access to your account</h1>

                <label htmlFor="name">Username</label><input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="name" />
                <label htmlFor="password">Password</label><input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" id="password" />

                <br />
                
                <button onClick={submit} className="exibir">Create account</button>
            
            </div>
        </>
    )
}