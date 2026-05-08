import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const PHONE_ENTER_START = 0;
const PHONE_ENTER_DURATION = 40;
const NOTIF_START = 70;
const FLOAT_AMPLITUDE = 6;
const FLOAT_SPEED = 0.025;

function PhoneBody() {
  return (
    <div
      style={{
        width: 280,
        height: 560,
        background: 'linear-gradient(160deg, #1a1a2e 0%, #0d0d1a 100%)',
        borderRadius: 40,
        border: '2px solid rgba(255,255,255,0.12)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(100,100,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Notch */}
      <div
        style={{
          width: 110,
          height: 28,
          background: '#0d0d1a',
          borderRadius: '0 0 20px 20px',
          marginTop: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#1e1e2e',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <div
          style={{
            width: 60,
            height: 6,
            borderRadius: 3,
            background: '#1e1e2e',
          }}
        />
      </div>

      {/* Screen content */}
      <div
        style={{
          flex: 1,
          width: '100%',
          padding: '10px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 4px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600 }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {/* Signal bars */}
            {[3, 5, 7, 9].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: 1,
                }}
              />
            ))}
            {/* Battery */}
            <div
              style={{
                width: 20,
                height: 10,
                border: '1px solid rgba(255,255,255,0.5)',
                borderRadius: 2,
                padding: 1,
                display: 'flex',
                alignItems: 'center',
                marginLeft: 2,
              }}
            >
              <div
                style={{
                  width: '75%',
                  height: '100%',
                  background: '#4ade80',
                  borderRadius: 1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Lock icon area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 30,
            gap: 8,
          }}
        >
          <div style={{ fontSize: 32 }}>🔒</div>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 28, fontWeight: 200 }}>
            09:41
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
            quinta-feira, 8 de maio
          </span>
        </div>
      </div>

      {/* Home bar */}
      <div
        style={{
          width: 100,
          height: 4,
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 2,
          marginBottom: 10,
        }}
      />

      {/* Screen glare */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
          borderRadius: 40,
        }}
      />
    </div>
  );
}

function NotificationBubble({ progress }) {
  const translateY = interpolate(progress, [0, 1], [-80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 16,
        right: 16,
        transform: `translateY(${translateY}px)`,
        opacity,
      }}
    >
      <div
        style={{
          background: 'rgba(28, 28, 40, 0.92)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* App icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          💬
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.2,
              }}
            >
              Mensagem
            </span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>agora</span>
          </div>
          <span
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              fontWeight: 400,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            ei vc esta ai? 👋
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PhoneNotification() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance spring
  const phoneEnterProgress = spring({
    frame: frame - PHONE_ENTER_START,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.2 },
    durationInFrames: PHONE_ENTER_DURATION,
  });

  // Zero gravity float
  const floatY = Math.sin(frame * FLOAT_SPEED * Math.PI * 2) * FLOAT_AMPLITUDE;
  const floatX = Math.cos(frame * FLOAT_SPEED * Math.PI * 2 * 0.7) * (FLOAT_AMPLITUDE * 0.4);
  const floatRotate = Math.sin(frame * FLOAT_SPEED * Math.PI * 2 * 0.5) * 2.5;

  // Phone entrance: scale + fade from below
  const phoneScale = interpolate(phoneEnterProgress, [0, 1], [0.6, 1]);
  const phoneOpacity = interpolate(phoneEnterProgress, [0, 0.4, 1], [0, 0.8, 1]);
  const phoneEnterY = interpolate(phoneEnterProgress, [0, 1], [120, 0]);

  // Slow initial rotation (first ~60 frames)
  const initialRotateDuration = 60;
  const initialRotateProgress = Math.min(frame / initialRotateDuration, 1);
  const easedInitialRotate = initialRotateProgress < 1
    ? interpolate(initialRotateProgress, [0, 1], [-15, 0], {
        easing: (t) => t * (2 - t), // ease out quad
      })
    : 0;

  const totalRotate = easedInitialRotate + floatRotate * phoneEnterProgress;
  const totalY = phoneEnterY + floatY * phoneEnterProgress;
  const totalX = floatX * phoneEnterProgress;

  // Notification
  const notifProgress = spring({
    frame: frame - NOTIF_START,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.8 },
    durationInFrames: 30,
  });

  // Background ambient glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.04 * Math.PI * 2),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0f0f2e 0%, #050510 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Ambient glow behind phone */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, rgba(100, 80, 255, ${0.12 * glowPulse}) 0%, transparent 70%)`,
          transform: `translate(${totalX}px, ${totalY}px)`,
          opacity: phoneOpacity,
        }}
      />

      {/* Stars / particles */}
      {[...Array(20)].map((_, i) => {
        const x = (((i * 137.5) % 100) - 50) * 16;
        const y = (((i * 97.3) % 100) - 50) * 10;
        const size = 1 + (i % 3) * 0.8;
        const twinkle = interpolate(
          Math.sin((frame * 0.03 + i) * Math.PI * 2),
          [-1, 1],
          [0.2, 0.8]
        );
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'white',
              transform: `translate(${x}px, ${y}px)`,
              opacity: twinkle * phoneOpacity,
            }}
          />
        );
      })}

      {/* Phone */}
      <div
        style={{
          transform: `translate(${totalX}px, ${totalY}px) rotate(${totalRotate}deg) scale(${phoneScale})`,
          opacity: phoneOpacity,
          position: 'relative',
        }}
      >
        <PhoneBody />
        <NotificationBubble progress={notifProgress} />
      </div>
    </AbsoluteFill>
  );
}
