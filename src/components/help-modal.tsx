import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';

const HelpModal = () => {
  const { showHelp, setShowHelp } = useNoteContext();
  const handleClickHelp = () => {
    setShowHelp(!showHelp);
  }

  return (
      <div className={cn("fixed w-screen h-dvh top-0 left-0 z-[999] items-center justify-center flex", showHelp ? 'flex' : 'hidden')}>
        <div className="border border-foreground p-4 w-[360px] h-fit flex flex-col gap-4 items-center justify-center bg-black">
        <p className="text-center">♫⋆｡♪ ₊˚♬.blackmidi♫⋆｡♪ ₊˚♬ﾟ.</p>
        <p className="text-center">
          ║░█░█░║░█░█░█░║░█░█░║
          ║░█░█░║░█░█░█░║░█░█░║
          ║░║░║░║░║░║░║░║░║░║░║
          ╚═╩═╩═╩═╩═╩═╩═╩═╩═╩═╝
        </p>
        <p className="text-xs text-justify">
          Welcome! This is a repository of my current favorite jazz standards. You may plug your MIDI in and play or just use ur laptop as a ~keyboard~ dont forget to toggle the corresponding device that ure using at the bottom left corner!<br /><br />
          This app is only available for Desktop & Laptop at the moment.
          <br /><br />
          send me love at <a href="https://instagram.com/ekezia" target="_blank">@ekezia</a> or <a href="https://klogs.e-kezia.com">my site</a> 
          <br />
        </p>
        <button className="border-foreground bg-foreground text-background border w-fit hover:bg-background hover:text-foreground cursor-pointer p-2" onClick={handleClickHelp}>Ready to Play</button>
        </div>
      </div>
  )
}

export default HelpModal;