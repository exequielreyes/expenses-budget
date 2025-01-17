'use client'

import { useGoogleAuth } from "@hooks/useGoogleAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {

  const { signOutWhithGoogle } = useGoogleAuth()
  const router = useRouter()

  useEffect(() => {
    signOutWhithGoogle()
    router.push('/')
  }, [])

  return <div>Logout</div>
}