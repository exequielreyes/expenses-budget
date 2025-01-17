import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies()
  const authToken = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN_NAME)

  if (!authToken) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 })
  }

  return NextResponse.json({ token: authToken.value })
}
