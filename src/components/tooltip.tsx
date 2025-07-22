// components/ui/Tooltip.tsx
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/utils/utils';

export function Tooltip({
  children,
  content,
  className,
}: {
  children: React.ReactNode;
  content: string;
  className?: string;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={cn(
              "bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-50 border border-foreground",
              className
            )}
            sideOffset={4}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-black" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
