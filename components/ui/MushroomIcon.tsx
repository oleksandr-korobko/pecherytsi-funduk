interface MushroomIconProps {
  size?: number;
  className?: string;
}

export function MushroomIcon({ size = 64, className = '' }: MushroomIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Mushroom Cap */}
      <ellipse
        cx="50"
        cy="45"
        rx="35"
        ry="25"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="2"
      />

      {/* Cap Texture/Spots */}
      <ellipse cx="40" cy="38" rx="8" ry="6" fill="#A0522D" opacity="0.6" />
      <ellipse cx="60" cy="42" rx="6" ry="5" fill="#A0522D" opacity="0.6" />
      <ellipse cx="50" cy="35" rx="5" ry="4" fill="#A0522D" opacity="0.6" />

      {/* Mushroom Stem */}
      <rect
        x="42"
        y="55"
        width="16"
        height="30"
        rx="3"
        fill="#F5DEB3"
        stroke="#D2B48C"
        strokeWidth="1.5"
      />

      {/* Stem Details */}
      <ellipse cx="50" cy="60" rx="8" ry="3" fill="#FAEBD7" opacity="0.7" />

      {/* Gills under cap */}
      <path
        d="M 20 45 Q 50 55, 80 45"
        fill="#D2B48C"
        opacity="0.5"
      />
    </svg>
  );
}
