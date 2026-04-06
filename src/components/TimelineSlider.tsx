"use client";

import { useCallback } from "react";
import { Calendar } from "lucide-react";

interface TimelineSliderProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

export function TimelineSlider({
  range,
  onChange,
  min = 2010,
  max = 2026,
}: TimelineSliderProps) {
  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      onChange([Math.min(val, range[1]), range[1]]);
    },
    [range, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      onChange([range[0], Math.max(val, range[0])]);
    },
    [range, onChange]
  );

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-4 bg-bg-dark/80 backdrop-blur-md rounded-xl px-6 py-3 border border-border-dark w-[60%] max-w-xl">
      <Calendar className="w-4 h-4 text-accent-gold shrink-0" />
      <span className="text-xs font-mono text-text-primary-dark shrink-0 w-8 text-center">
        {range[0]}
      </span>

      <div className="relative flex-1 flex items-center h-6">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1 rounded-full bg-white/10" />
        {/* Active range */}
        <div
          className="absolute h-1 rounded-full bg-accent-gold/60"
          style={{
            left: `${((range[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((range[1] - min) / (max - min)) * 100}%`,
          }}
        />
        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range[0]}
          onChange={handleMinChange}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-gold [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(212,168,67,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bg-dark"
        />
        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range[1]}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-gold [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(212,168,67,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-bg-dark"
        />
      </div>

      <span className="text-xs font-mono text-text-primary-dark shrink-0 w-8 text-center">
        {range[1]}
      </span>
    </div>
  );
}
