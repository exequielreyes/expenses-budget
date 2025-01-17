import { NextResponse } from "next/server"
import { serialize } from "cookie"

export async function POST(req) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 })
  }

  // Configuración de la cookie
  const cookie = serialize(process.env.NEXT_PUBLIC_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 // 1 hora
  })

  const response = NextResponse.json({ success: true })
  response.headers.set("Set-Cookie", cookie)
  return response
}
