import { useNoteContext } from '@/contexts/note-context';
import { cn, map } from '@/utils/utils';
import { ReactNode } from 'react';

const FilterContainer = ({ className, children }: { className?: string, children: ReactNode }) => {
  const { savedPreference } = useNoteContext();
  
  return (
    <div
      className={cn('relative bg-background', className)}
      style={{
        filter: `hue-rotate(${map(savedPreference.hue, 0, 127, 0, 360)}deg) grayscale(${map(savedPreference.grayscale, 0, 127, 0, 100)}%) invert(${map(savedPreference.invert, 0, 127, 0, 100)}%)`,
      }}>
      {children}
    </div>
  )
}

export default FilterContainer;