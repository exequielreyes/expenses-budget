import { NextResponse } from "next/server"
import { serialize } from "cookie"

export async function POST() {
  const cookie = serialize(process.env.NEXT_PUBLIC_TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0
  })

  const response = NextResponse.json({ success: true, message: "Sesión cerrada correctamente" })
  response.headers.set("Set-Cookie", cookie)

  return response
}
