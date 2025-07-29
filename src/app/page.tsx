'use client'

import FilterContainer from '@/components/filter-container';
import { NoteProvider } from '../contexts/note-context';
import Document from '@/components/document';
import Keyboard from '@/components/keyboard';
import { MidiLogger } from '@/components/midi-logger';
import ControllerBoard from '@/components/controller-board';
import HelpModal from '@/components/help-modal';

export default function Home() {
  return (
    <NoteProvider>
        <FilterContainer className="w-screen h-dvh relative overflow-hidden">
          <ControllerBoard className="absolute top-0 border-b py-2 w-full z-1 bg-background overflow-x-scroll" />
          <HelpModal />
          <Keyboard className="absolute bottom-0 border-t py-4 w-full z-1 bg-background overflow-x-scroll" />
          <MidiLogger />
          <Document />
        </FilterContainer>
    </NoteProvider>
  );
}
