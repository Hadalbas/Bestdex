import { NextResponse } from "next/server"

export function proxy(request){
    const token = request.cookies.get('token')?.value

    //se tentar acessar a rota account sem cookie, redireciona

    if(request.nextUrl.pathname.startsWith('/account') && !token){
        console.log("Acesso negado!")
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log('bem-vindo,,,')
    return NextResponse.next()
}

//o código do proxy será executado na rota /account e em qualquer sub-rota abaixo dela
export const config = {
    matcher: ['/account/:path*']
}