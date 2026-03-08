import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AuthorAvatarProps {
  name: string;
  image: string;
}

const AuthorAvatar = ({ name, image }: AuthorAvatarProps) => (
  <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
    <Avatar className="w-12 h-12 ring-2 ring-border transition-shadow group-hover:ring-primary">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback className="bg-muted text-muted-foreground text-sm">{name[0]}</AvatarFallback>
    </Avatar>
    <span className="text-[11px] font-medium text-muted-foreground text-center w-14 truncate">{name}</span>
  </div>
);

export default AuthorAvatar;
