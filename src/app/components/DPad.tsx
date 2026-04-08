import React from "react";
import { LuArrowUp, LuArrowDown, LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { clsx } from "clsx";

interface DPadProps {
  className?: string;
  onDirection?: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

export const DPad: React.FC<DPadProps> = ({ className, onDirection }) => {
  return (
    <div className={clsx("grid grid-cols-3 grid-rows-3 gap-2", className)}>
      <div className="col-start-2">
        <button 
          onClick={() => onDirection?.('UP')}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/20 text-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all active:scale-95 active:border-primary active:text-primary active:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <LuArrowUp size={32} />
        </button>
      </div>
      
      <div className="col-start-1 row-start-2">
        <button 
          onClick={() => onDirection?.('LEFT')}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/20 text-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all active:scale-95 active:border-primary active:text-primary active:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <LuArrowLeft size={32} />
        </button>
      </div>
      
      <div className="col-start-2 row-start-2 flex items-center justify-center">
        {/* Soft elegant central pivot */}
        <div className="h-6 w-6 rounded-full bg-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/5"></div>
      </div>

      <div className="col-start-3 row-start-2">
        <button 
          onClick={() => onDirection?.('RIGHT')}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/20 text-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all active:scale-95 active:border-primary active:text-primary active:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <LuArrowRight size={32} />
        </button>
      </div>

      <div className="col-start-2 row-start-3">
        <button 
          onClick={() => onDirection?.('DOWN')}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/20 text-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all active:scale-95 active:border-primary active:text-primary active:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
          <LuArrowDown size={32} />
        </button>
      </div>
    </div>
  );
};
