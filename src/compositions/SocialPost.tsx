import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  message: string;
  cta: string;
};

const BRAND_BLUE = "#1a3a5c";
const BRAND_GOLD = "#c9a84c";

export const SocialPost: React.FC<Props> = ({ message, cta }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const messageProgress = spring({ fps, frame, delay: 5, config: { damping: 12 } });
  const ctaProgress = spring({ fps, frame, delay: 25, config: { damping: 12 } });

  const pulseScale = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 1.04, 1],
    { extrapolateRight: "clamp" }
  );

  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, #0d2238 100%)`,
        opacity: fadeOut,
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `2px solid ${BRAND_GOLD}`,
          opacity: 0.15,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: `2px solid ${BRAND_GOLD}`,
          opacity: 0.1,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          gap: 40,
        }}
      >
        {/* LMC Logo text */}
        <div
          style={{
            fontSize: 48,
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            color: BRAND_GOLD,
            letterSpacing: 6,
          }}
        >
          LMC
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: 48,
            fontFamily: "Georgia, serif",
            fontWeight: 600,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.3,
            opacity: messageProgress,
            transform: `translateY(${interpolate(messageProgress, [0, 1], [50, 0])}px)`,
          }}
        >
          {message}
        </div>

        {/* CTA Button */}
        <div
          style={{
            fontSize: 28,
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
            color: BRAND_BLUE,
            backgroundColor: BRAND_GOLD,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 48,
            paddingRight: 48,
            borderRadius: 8,
            opacity: ctaProgress,
            transform: `scale(${interpolate(ctaProgress, [0, 1], [0.8, 1])} ) scale(${pulseScale})`,
            letterSpacing: 1,
          }}
        >
          {cta}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
