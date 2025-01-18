import { importX509, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const JWKS_URL =
      'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    const response = await fetch(JWKS_URL)
    const publicKeys = await response.json()

    const [header] = token.split('.')

    const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString('utf-8'))

    const publicKeyPEM = publicKeys[decodedHeader.kid]

    if (!publicKeyPEM) {
      throw new Error('No se encontró la clave pública para el token')
    }

    const publicKey = await importX509(publicKeyPEM, 'RS256')
 
    const { payload } = await jwtVerify(token, publicKey, {
      issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })

    console.log('Token válido')
    const responseNext = NextResponse.next()
    responseNext.headers.set('x-user-email', payload.email as string)

    return responseNext
  } catch (error) {
    console.error('Error al verificar el token:', error)
    return NextResponse.redirect(new URL('/logout', request.url))
  }
}

export const config = {
  matcher: ['/dashboard'],
}
