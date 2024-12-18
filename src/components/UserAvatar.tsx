import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export const UserAvatar = ({ image, alt, nameInitials }: { image: string, alt: string, nameInitials: string }) => {
  return (
    <Avatar>
      <AvatarImage src={image} alt={alt} />
      <AvatarFallback>{nameInitials}</AvatarFallback>
    </Avatar>
  )
}
