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
            <div className="main-page">

                <h1>Log into Bestdex to have access to your account</h1>


                {
                    loginFail
                        ? <p className='loginfail'>{loginFail}</p>
                        : <div>
                            <label autoFocus htmlFor="nome">Username</label><input value={nome} onChange={e => { setNome(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="nome" />
                            <label htmlFor="senha">Password</label><input value={senha} onChange={e => { setSenha(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="senha" />
                        </div>
                }

                <br />

                {
                    loginFail ? <button onClick={handleReset}>Tentar novamente</button>
                        : <button onClick={handleLogin} className="exibir">Log-in</button>
                }

                <Link href='/'><button className='exibir'>Back</button></Link>


            </div>
        </>
    )
}