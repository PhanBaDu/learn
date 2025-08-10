import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '../../../public/assets/logo.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser } from '@/hooks/current-user';
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <div className="p-5 border-b border-b-muted flex justify-between items-center">
      <div className="flex gap-2 items-center flex-1">
        <Logo width={100} height={40} />
      </div>
      <div className="flex-1">
        <Input
          placeholder="Tìm kiếm khóa học, bài viết, video..."
          className="p-2 rounded-xl h-11 shadow-none"
        />
      </div>
      <div className="flex-1 flex justify-end gap-5">
        {user ? (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Avatar className="rounded-2xl cursor-pointer">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="text-xs rounded-2xl">
                  {user.firstName?.charAt(0) || ''}
                  {user.lastName?.charAt(0) || ''}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 shadow-none">
              <DropdownMenuLabel>
                {user.firstName} {user.lastName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer w-full p-0">
                <Button variant={'destructive'} className="w-full" asChild>
                  <LogoutLink>Đăng xuất</LogoutLink>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <RegisterLink>
              <Button className="rounded-xl h-11 w-32 shadow-none" variant={'secondary'}>
                Đăng Ký
              </Button>
            </RegisterLink>
            <LoginLink>
              <Button className="rounded-xl h-11 w-32 shadow-none" variant={'default'}>
                Đăng Nhập
              </Button>
            </LoginLink>
          </>
        )}
      </div>
    </div>
  );
}
