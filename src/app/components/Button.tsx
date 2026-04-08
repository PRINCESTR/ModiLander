import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative flex items-center justify-center font-sans tracking-widest font-bold uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none",
          variant === "primary" &&
            "px-6 py-4 bg-primary text-black rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:bg-white hover:text-primary active:bg-primary active:text-black",
          variant === "secondary" &&
            "px-4 py-3 bg-white/5 text-white backdrop-blur-md rounded-xl border border-white/20 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]",
          variant === "icon" &&
            "p-3 bg-white/5 text-white backdrop-blur-md rounded-xl border border-white/10 hover:border-primary/50 hover:text-primary hover:bg-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-90",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
