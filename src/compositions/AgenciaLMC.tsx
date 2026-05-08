import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title: string;
  subtitle: string;
  location: string;
};

const BRAND_BLUE = "#1a3a5c";
const BRAND_GOLD = "#c9a84c";

export const AgenciaLMC: React.FC<Props> = ({ title, subtitle, location }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ fps, frame, delay: 10, config: { damping: 14 } });
  const subtitleProgress = spring({ fps, frame, delay: 30, config: { damping: 14 } });
  const locationProgress = spring({ fps, frame, delay: 50, config: { damping: 14 } });
  const lineWidth = interpolate(frame, [20, 60], [0, 400], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND_BLUE }}>
      {/* Background grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: 80,
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: BRAND_GOLD,
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            opacity: titleProgress,
            transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            color: BRAND_GOLD,
            textAlign: "center",
            opacity: subtitleProgress,
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [30, 0])}px)`,
            letterSpacing: 2,
          }}
        >
          {subtitle}
        </div>

        {/* Gold accent line bottom */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: BRAND_GOLD,
            borderRadius: 2,
          }}
        />

        {/* Location */}
        <div
          style={{
            fontSize: 24,
            fontFamily: "Arial, sans-serif",
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            opacity: locationProgress,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {location}
        </div>
      </AbsoluteFill>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${BRAND_GOLD}, transparent)`,
          opacity: interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
