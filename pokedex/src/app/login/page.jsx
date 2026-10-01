'use client'

import Link from "next/link"
import { useState } from "react"

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
            <div className="main-page">
                <br /><br /><br /><br />
                <br /><br /><br /><br />

                <h2>Log into your account to have access to your teams</h2>
                <div className='login'>
                    {loginFail
                        ? <p className='loginfail'>{loginFail}</p>
                        : <>
                            Name: <input autoFocus type='text' value={name} onChange={e => setName(e.target.value)} id='name' onKeyUp={handleKeyUp} /> &nbsp;
                            Password: <input type='text' value={password} onChange={e => setPassword(e.target.value)} id='password' onKeyUp={handleKeyUp} />
                            <br /><button className='exibir' onClick={handleLogin}>Log-in</button>
                        </>
                    }
                </div>
                {loginFail && <button onClick={() => setLoginFail('')}>Tentar novamente</button>}
                <br />
                <Link href='/'><button className='exibir'>Back</button></Link>

            </div>
        </>
    )
}