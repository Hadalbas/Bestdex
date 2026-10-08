'use client'

import Link from "next/link"
import { useState } from "react"
import './login.css'
import HideHeader from '@/components/HideHeader'
import { accessTreinador, createTreinador } from "@/lib/api"

export default function Login() {

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')
    const [loginFail, setLoginFail] = useState('')
    const [signIn, setSignIn] = useState(false)

    async function handleLogin() {

        try {
            //const response = await api.post('/treinadores', { nome, senha })
            const treinador = {nome: nome, senha: senha}
            const response = signIn ? await createTreinador(treinador) : await accessTreinador(treinador)
            if (!signIn && response.status == 200) {
                console.log('Logged in sucessfully! Redirecting...')

                //criar cookie local pq o chrome não deixa o localhost acessar o cookie que vem de ads.osorio.ifrs.edu.br - remover se a página for hospedada num servidor
                const tokenValue = response.data.token || 'usuario_autenticado_remotamente'
                alert(tokenValue)
                document.cookie = `token=${tokenValue}; path=/; max-age=86400; SameSite=Lax`

                window.location.replace('/account')
            }
            if (signIn && response.status == 201) {
                console.log('Created account sucessfully! Redirecting...')

                //criar cookie local pq o chrome não deixa o localhost acessar o cookie que vem de ads.osorio.ifrs.edu.br - remover se a página for hospedada num servidor
                const tokenValue = response.data.token || 'usuario_autenticado_remotamente'
                document.cookie = `token=${tokenValue}; path=/; max-age=86400; SameSite=Lax`

                window.location.replace('/account')
            }
            console.log("Resposta:" + response)
        } catch (error) {
            console.log("Erro:" + error)

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
                    <h1>{signIn ? "Sign" : "Log"}-in</h1>
                    <h3>{signIn ? "Sign" : "Log"} into Bestdex to {signIn ? "create an" : "access your"} account</h3>
                    
                        {
                            loginFail
                                ? <p className='loginfail'>{loginFail}</p>
                                : <div>
                                    <input value={nome} onChange={e => { setNome(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="nome" placeholder="Username" />
                                    <input value={senha} onChange={e => { setSenha(e.target.value) }} onKeyUp={handleKeyUp} type="text" id="senha" placeholder="Password" />
                                </div>
                        }
                        
                        <br />
                        
                        {loginFail
                                ? <button onClick={handleReset} className="login-exibir">Try Again</button>
                                : <button onClick={handleLogin} className="login-exibir">{signIn ? "Sign" : "Log"}-in</button>
                        }

                    <p className="clickable" onClick={() => setSignIn(!signIn)}>{signIn ? "Already have an account? " : "Don't have an account yet? "}Click here to {signIn ? "log" : "sign"}-in</p>

                    <Link href='/'><button className='login-exibir login-back'>Back</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}