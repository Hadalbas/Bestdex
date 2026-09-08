import { NextResponse } from "next/server"

export function proxy(request){
    const token = request.cookies.get('token')?.value

    //se tentar acessar a rota usuario sem cookie, redireciona

    if(request.nextUrl.pathname.startsWith('/usuario') && !token){
        console.log("Acesso negado!")
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log('bem-vindo,,,')
    return NextResponse.next()
}

//o código do proxy será executado na rota /usuario e em qualquer sub-rota abaixo dela
export const config = {
    matcher: ['/usuario/:path*']
}