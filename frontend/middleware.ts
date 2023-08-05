import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const currentPath = req.nextUrl.pathname;
    
    // if (currentPath === '/get-started/find') {
    //     return NextResponse.next();
    // }

    // const token = req.cookies.get('token')
    // if (!token) {
    //     return NextResponse.redirect(new URL('/get-started/find', req.url))
    // }
    
    return NextResponse.next();
}
