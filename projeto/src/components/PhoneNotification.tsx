import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const PhoneNotification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 180 },
  });

  const translateY = interpolate(slideIn, [0, 1], [-120, 0]);
  const opacity = interpolate(slideIn, [0, 0.4], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 80,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          borderRadius: 20,
          padding: "18px 24px",
          width: 480,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            backgroundColor: "#e94560",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 28,
          }}
        >
          📣
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontFamily: "sans-serif",
              marginBottom: 4,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Agência LMC
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 17,
              fontFamily: "sans-serif",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Nova campanha disponível!
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              fontFamily: "sans-serif",
              lineHeight: 1.4,
            }}
          >
            Sua estratégia de marketing digital está pronta.
          </div>
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            fontFamily: "sans-serif",
            alignSelf: "flex-start",
          }}
        >
          agora
        </div>
      </div>
    </AbsoluteFill>
  );
};
