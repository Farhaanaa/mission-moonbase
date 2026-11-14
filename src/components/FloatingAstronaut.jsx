import React from 'react';

/**
 * Vintage Editorial Line-Art Floating Astronaut
 * Smooth keyframe-driven 1/6th gravity floating movement.
 */
export default function FloatingAstronaut({ size = 180, className = '' }) {
  return (
    <div className={`floating-astronaut inline-block relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Subtle umbilical safety tether */}
        <path
          d="M 40 190 Q 70 140 100 130 T 115 110"
          stroke="#C5A66A"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.75"
        />

        {/* Life Support Backpack */}
        <rect
          x="75"
          y="70"
          width="32"
          height="52"
          rx="6"
          fill="#E2DDD5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />
        <circle cx="91" cy="85" r="4" fill="#B64B2C" />
        <rect x="85" y="96" width="12" height="16" rx="2" fill="#A6A39C" opacity="0.5" />

        {/* Torso & Suit */}
        <path
          d="M 96 75 C 108 75 125 78 128 92 C 130 106 122 120 110 125 C 100 128 92 120 92 105 Z"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />

        {/* Mission Patch / Flag on Chest */}
        <rect x="114" y="92" width="7" height="5" rx="1" fill="#B64B2C" />
        <rect x="114" y="94" width="7" height="1.5" fill="#C5A66A" />

        {/* Right Leg & Boot */}
        <path
          d="M 112 124 Q 120 145 130 160 L 140 160 C 143 160 144 165 138 167 L 122 167 Q 112 148 106 126 Z"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />

        {/* Left Leg & Boot (angled in zero-G) */}
        <path
          d="M 100 125 Q 92 145 80 156 L 70 154 C 67 153 67 158 72 161 L 86 163 Q 98 148 104 125 Z"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />

        {/* Helmet / Dome */}
        <circle
          cx="116"
          cy="62"
          r="19"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />

        {/* Gold Reflective Visor */}
        <path
          d="M 118 48 C 128 49 133 55 133 63 C 133 71 127 76 118 76 C 111 76 109 70 109 63 C 109 56 111 48 118 48 Z"
          fill="#C5A66A"
          stroke="#191A1B"
          strokeWidth="1.5"
        />
        {/* Visor Glint Reflection */}
        <path
          d="M 122 53 Q 126 57 125 64"
          stroke="#F2EEE5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Reaching Right Arm & Glove */}
        <path
          d="M 126 82 Q 146 76 156 66 L 161 68 C 163 70 160 74 156 75 L 142 86 Q 133 90 126 86 Z"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2.5"
        />

        {/* Left Arm (stabilizing) */}
        <path
          d="M 104 84 Q 90 92 82 102 L 78 98 C 76 96 73 99 76 103 L 84 108 Q 94 98 104 90 Z"
          fill="#F2EEE5"
          stroke="#191A1B"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
