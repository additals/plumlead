import React from 'react';

interface LogoProps {
  className?: string;
  showBg?: boolean;
}

export default function Logo({ className = "w-10 h-10", showBg = true }: LogoProps) {
  return (
    <div className={`relative ${className} flex-shrink-0`} id="plumlead-brand-logo-container">
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        id="plumlead-brand-logo-svg"
      >
        {/* Background rounded square */}
        {showBg && (
          <rect
            width="512"
            height="512"
            rx="112"
            fill="#1e5bfb"
            id="logo-bg-rect"
          />
        )}
        
        {/* White Plumbing Pipe 'P' */}
        {/* 1. Left Vertical Stem */}
        <path
          d="M 165 260 L 165 390"
          stroke="white"
          strokeWidth="44"
          strokeLinecap="butt"
          id="pipe-stem"
        />
        {/* Bottom flange */}
        <rect
          x="135"
          y="380"
          width="60"
          height="18"
          rx="5"
          fill="white"
          id="pipe-flange-bottom"
        />
        
        {/* 2. Top-Left curve to Top-Middle */}
        <path
          d="M 165 260 L 165 190 C 165 140 210 115 250 115"
          stroke="white"
          strokeWidth="44"
          fill="none"
          strokeLinecap="butt"
          id="pipe-curve-top-left"
        />
        {/* Top-middle vertical flange */}
        <rect
          x="241"
          y="93"
          width="18"
          height="44"
          rx="5"
          fill="white"
          id="pipe-flange-top-mid"
        />
        
        {/* 3. Top-Middle to Right Loop & middle flange */}
        <path
          d="M 250 115 C 320 115 355 160 355 220 L 355 240"
          stroke="white"
          strokeWidth="44"
          fill="none"
          strokeLinecap="butt"
          id="pipe-curve-top-right"
        />
        {/* Right middle horizontal flange */}
        <rect
          x="333"
          y="231"
          width="44"
          height="18"
          rx="5"
          fill="white"
          id="pipe-flange-right-mid"
        />
        
        {/* 4. Right Loop returning to the Stem */}
        <path
          d="M 355 240 C 355 300 310 310 240 310 L 165 310"
          stroke="white"
          strokeWidth="44"
          fill="none"
          strokeLinecap="butt"
          id="pipe-curve-bottom-right"
        />
        {/* Bottom curve vertical flange */}
        <rect
          x="231"
          y="288"
          width="18"
          height="44"
          rx="5"
          fill="white"
          id="pipe-flange-bottom-mid"
        />

        {/* Growth Trend Arrow */}
        {/* Arrow path */}
        <path
          d="M 115 385 L 235 265 L 275 305 L 415 135"
          stroke="white"
          strokeWidth="32"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
          id="growth-arrow-shaft"
        />
        {/* Arrowhead */}
        <polygon
          points="415,135 325,185 355,195 365,225"
          fill="white"
          id="growth-arrowhead"
        />
      </svg>
    </div>
  );
}
