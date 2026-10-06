'use client'

import Link from "next/link"
import { useState } from "react"
import './login.css'
import HideHeader from '@/components/HideHeader'

export default function Login() {

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [loginFail, setLoginFail] = useState('')

    const encodedParams = new URLSearchParams();
    encodedParams.set('nome', 'secret');
    encodedParams.set('senha', 'codes');

    const options = {
        method: 'POST',
        url: 'http://localhost:3005/login',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: encodedParams,
    };

    async function handleLogin() {
        //alert(`${nome} ${senha}`)

        try {
            const response = await api.post('/login', { nome: nome, senha: senha })
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

    function handleReset() {
        setLoginFail('')
        setNome('')
        setSenha('')
    }

    function handleKeyUp(e) {
        if (e.key == 'Enter') {
            handleLogin()
        } else if (e.key == 'Escape') {
            if (e.target.id == 'nome') setNome('')
            if (e.target.id == 'senha') setSenha('')
        }
    }

    return (
        <>
            <HideHeader />
            <div key="login-page" className="login-page">

                <div className="login-container">
                    <div className="login-banner-container"></div>
                    <div className="login-input">
                    <h1>Sign in</h1>
                    <h3>Log into Bestdex to access your account</h3>
                    
                        {
                            loginFail
                                ? <p className='loginfail'>{loginFail}</p>
                                : <div>
                                    <input value={nome} onChange={e => { setNome(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="nome" placeholder="Email or Username" />
                                    <input value={senha} onChange={e => { setSenha(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="senha" placeholder="Password" />
                                </div>
                        }
                        
                        {
                            loginFail ? <button onClick={handleReset} className="try-again">Tentar novamente</button>
                                : <button onClick={handleLogin} className="login-exibir">Log-in</button>
                        }
                    <Link href='/'><button className='login-exibir login-back'>Back</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}