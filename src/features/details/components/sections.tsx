import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function Sections() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none p-0 m-0">
        <AccordionTrigger className="font-bold bg-muted/70 px-5 rounded-xl border">
          <span>Bài học 1</span>
        </AccordionTrigger>
        <AccordionContent className='pb-0'>
          <Button
            variant={'ghost'}
            className="p-6 w-full cursor-text flex justify-between items-center gap-[10px] hover:!bg-transparent"
          >
            <div className="flex items-center gap-3">
              <Play className="text-primary" />
              <span className="text-foreground">
                1. Yes. It adheres to the WAI-ARIA design pattern.
              </span>
            </div>
            <p className="text-muted-foreground">10:00</p>
          </Button>
          <Button
            variant={'ghost'}
            className="p-6 w-full cursor-text flex justify-between items-center gap-[10px] hover:!bg-transparent"
          >
            <div className="flex items-center gap-3">
              <Play className="text-primary" />
              <span className="text-foreground">
                2. Yes. It adheres to the WAI-ARIA design pattern.
              </span>
            </div>
            <p className="text-muted-foreground">10:00</p>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}