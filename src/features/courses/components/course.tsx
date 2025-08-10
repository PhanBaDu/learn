import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ClockFading, UsersRound, Play } from 'lucide-react';
import Image from 'next/image';

export default function Course() {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Image
        src={'/assets/test.png'}
        alt="route"
        width={1000}
        height={1000}
        className="w-full"
        quality={100}
      />
      <div className="p-5 bg-muted/70 flex flex-col gap-2">
        <h1 className="text-sm font-bold">JavaScript</h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar className="rounded-lg w-7 h-7">
              <AvatarImage src="https://github.com/evilrabbit.png" />
              <AvatarFallback>zv</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground font-bold text-nowrap">Anonymous</span>
          </div>
          <Button disabled={true} variant="ghost" className="p-0">
            <span className="text-xs text-muted-foreground font-bold leading-none">116h50p</span>
            <ClockFading strokeWidth={3} />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button disabled={true} variant="ghost" className="p-0 flex items-center gap-1">
            <Play strokeWidth={3} />
            <span className="text-xs text-muted-foreground font-bold leading-none">13</span>
          </Button>
          <Button disabled={true} variant="ghost" className="p-0 flex items-center gap-1">
            <span className="text-xs text-muted-foreground font-bold leading-none">
              135.992 người đang học
            </span>
            <UsersRound strokeWidth={3} />
          </Button>
        </div>
      </div>
    </div>
  );
}
