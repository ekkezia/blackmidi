import { ScoreData } from '@/sanity/lib/queries';
import React from 'react';

function renderChordSymbol(chord: string): React.ReactNode {
  return (
    <>
      {chord.split('').map((char, idx) => {
        if (char === '△' || char === 'M') {
          return <sub key={idx}>△</sub>;
        } else if (/\d/.test(char)) {
          return <sup key={idx} className="text-[12px]">{char}</sup>;
        } else if (char === 'b') {
          return <sup key={idx}>♭</sup>;
        } else if (char === '#') {
          return <sup key={idx}>{char}</sup>;
        } else if (char === 'ø') {
          return <sub key={idx}></sub>;
        }
        else {
          return <span key={idx}>{char}</span>;
        }
      })}
    </>
  );
}

export const ScoreDisplay = ({ score }: { score: ScoreData }) => {
  return (
    <div className="bg-black text-foreground p-4 font-mono text-lg w-full h-full">
      {/* Title and composer row */}
      <div className="text-center flex-1 font-bold text-xl leading-tight">
          {score.title}
      </div>

      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="text-sm italic">{score.feel}</div>
        </div>
        <div className="text-right text-sm">{score.composer}</div>
      </div>

      {/* Form sections */}
      {score.form && score.form.map((section, idx) => (
        <div key={idx} className="mb-4">
          {/* Section label and time signature */}
          <div className="flex items-center mb-1">
            <span className="border border-foreground px-1 text-xs mr-2">{section.section && section.section}</span>
          </div>

          {/* Bars */}
        <div className="flex gap-1">
          <div className="text-xs flex flex-col w-2">
{idx === 0 &&            <>
              <span>{score.timeSignature.split('/')[0]}</span><span>-</span>{score.timeSignature.split('/')[1]}
            </>
}          </div>

          <div className="grid grid-cols-4 gap-2 w-full">
            {section.bars.map((bar, barIdx) => (
              <div
                key={barIdx}
                className="border-l border-foreground pl-2 pr-4 py-2 min-w-[20%] max-w-[25%] whitespace-nowrap text-center"
              >
                {bar.chords.length === 1 ? (
                  <span>{renderChordSymbol(bar.chords[0])}</span>
                ) : (
                  <div className="flex space-x-2">
                    {bar.chords.map((chord, chordIdx) => (
                      <span key={chordIdx}>{renderChordSymbol(chord)}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};
