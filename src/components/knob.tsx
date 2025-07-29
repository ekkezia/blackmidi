import { useRef, useState } from 'react';
import { cn } from '@/utils/utils';

type Props = {
  value: number; // between -127 to 127
  onChange: (val: number) => void;
  allowCursor: boolean; // only allow when app inputType is on keyboard
} & React.HTMLAttributes<HTMLDivElement>;

export default function CustomKnob({ value, onChange, allowCursor, ...rest }: Props) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(value);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!allowCursor) return;
    e.preventDefault();
    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!allowCursor) return;

    const dy = startY.current - e.clientY; // Positive when dragging up
    const sensitivity = 0.7; // Tweak this
    const delta = dy * sensitivity;
    const newVal = Math.round(Math.max(-127, Math.min(127, startValue.current + delta)));
    onChange(newVal);
  };

  const handleMouseUp = () => {
    if (!allowCursor) return;

    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Map -127 to 127 to degrees (-135 to 135 for example)
  const degrees = (value / 127) * 135;

  return (
    <div
      ref={knobRef}
      onMouseDown={handleMouseDown}
      className={cn(
        "rounded-4xl w-8 h-8 border border-foreground relative transition-all", allowCursor ? 'pointer-events-auto cursor-pointer' : 'pointer-events-auto cursor-crosshair',
        rest.className
      )}
      style={{
        transform: `rotate(${degrees}deg)`,
        ...rest.style,
      }}
      {...rest}
    >
      <div
        className={cn(
          "border-foreground border-r border-l border-b h-4 top-0 left-[50%] translate-x-[-50%] w-1 absolute hover:bg-foreground",
          isDragging ? 'bg-foreground' : ''
        )}
      />
    </div>
  );
}
