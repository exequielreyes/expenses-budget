'use client'

import {
  LogOut,
  Settings,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGlobalContext } from "@context/GlobalContext"
//  import { UserAvatar } from "./UserAvatar"
import userImage from "@public/user.webp"
import Image from "next/image"
import { useGoogleAuth } from "@hooks/useGoogleAuth"
import { useRouter } from "next/navigation"

export const UserMenu = () => {

  const { signOutWhithGoogle } = useGoogleAuth()
  const { userData } = useGlobalContext()
  const { image, name } = userData || { image: userImage, email: 'user@email.com' }
  const router = useRouter()

  const handleSignOut = async () => {
    await signOutWhithGoogle()
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <UserAvatar image="https://leomoreno.vercel.app/me.webp" alt='@leomoreno' nameInitials='LM' /> */}
        <Image src={image} alt={`Avatar de ${name}`} className="rounded-full max-w-min" width={40} height={40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{ name ? name : 'Mi cuenta'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
            <DropdownMenuShortcut>Ctrl + P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Configuración</span>
            <DropdownMenuShortcut>Ctrl + S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span onClick={handleSignOut}>Cerrar sesión</span>
          <DropdownMenuShortcut>Ctrl + Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
