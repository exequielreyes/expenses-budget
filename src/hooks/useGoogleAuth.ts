import { useGlobalContext } from "@context/GlobalContext"
import { onAuthStateChanged, signIn, signOut } from "@lib/googleAuth"
import { UserData } from "../types/types"
import { useEffect } from "react"
import { getAuthCookie } from "@services/authCookiesService"

export const useGoogleAuth = () => {

  const { setUserData, userData } = useGlobalContext()

  useEffect(() => {
    const validateToken = async () => {
      const data: { token: string } | { error: string } = await getAuthCookie()

      if (isErrorResponse(data)) {
        // TODO: Luego manejar el error (mostrar un mensaje o algo)
        signOutWhithGoogle()
        return
      }
    }

    validateToken()
    onAuthStateChanged(setUserData)
  }, [])

  const signInWhithGoogle = async () => {
    const response: UserData | { error: string } = await signIn()

    if (isErrorResponse(response)) {
      // TODO: Luego manejar el error (mostrar un mensaje o algo)
      console.log(response.error)
      return
    }

    setUserData(response)
  }

  const signOutWhithGoogle = async () => {
    await signOut()
    setUserData(null)
  }

  return {
    signInWhithGoogle,
    signOutWhithGoogle,
    userData
  }
}

function isErrorResponse(response: any): response is { error: string } {
  return "error" in response
}