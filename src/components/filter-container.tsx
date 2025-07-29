import { useNoteContext } from '@/contexts/note-context';
import { cn, map } from '@/utils/utils';
import { ReactNode } from 'react';

const FilterContainer = ({ className, children }: { className?: string, children: ReactNode }) => {
  const { preference } = useNoteContext();
  
  return (
    <div
      className={cn('relative bg-background', className)}
      style={{
        filter: `hue-rotate(${map(preference.hue, 0, 127, 0, 360)}deg) grayscale(${map(preference.grayscale, 0, 127, 0, 100)}%) invert(${map(preference.invert, 0, 127, 0, 100)}%)`,
      }}>
      {children}
    </div>
  )
}

export default FilterContainer;