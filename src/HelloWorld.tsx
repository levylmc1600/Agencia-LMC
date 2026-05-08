import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${slideUp}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#e94560",
            margin: 0,
            fontFamily: "sans-serif",
            textShadow: "0 4px 20px rgba(233, 69, 96, 0.5)",
          }}
        >
          Agência LMC
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#a8b2d8",
            marginTop: 16,
            fontFamily: "sans-serif",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Marketing Digital
        </p>
        <p
          style={{
            fontSize: 18,
            color: "#6a7599",
            marginTop: 8,
            fontFamily: "sans-serif",
            letterSpacing: 2,
          }}
        >
          Fortaleza, CE
        </p>
      </div>
    </AbsoluteFill>
  );
};
