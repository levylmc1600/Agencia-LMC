import React from 'react';

const GOLD = '#D4AF37';
const WA_GREEN = '#25D366';

interface PhoneNotificationProps {
  senderName?: string;
  message?: string;
  time?: string;
  appName?: string;
}

const PhoneNotification: React.FC<PhoneNotificationProps> = ({
  senderName = 'LMC Agência',
  message = 'Olá! Pronto para transformar sua marca? Fale com a gente agora 🚀',
  time = 'agora',
  appName = 'WhatsApp',
}) => {
  return (
    <div style={styles.phone}>
      <div style={styles.notch} />
      <div style={styles.screen}>
        <div style={styles.statusBar}>
          <span style={styles.statusTime}>9:41</span>
          <div style={styles.statusIcons}>
            <span>▲▲▲</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        <div style={styles.notification}>
          <div style={styles.notifHeader}>
            <div style={styles.waIcon}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill={WA_GREEN}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.854L.057 23.885l6.204-1.626A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.802 9.802 0 01-5.002-1.374l-.36-.213-3.681.965.983-3.588-.235-.369A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
              </svg>
            </div>
            <span style={styles.appLabel}>{appName}</span>
            <span style={styles.notifTime}>{time}</span>
          </div>

          <div style={styles.notifBody}>
            <span style={styles.sender}>{senderName}</span>
            <p style={styles.message}>{message}</p>
          </div>
        </div>

        <div style={styles.lockHint}>Deslize para responder</div>
      </div>

      <div style={styles.homeBar} />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  phone: {
    position: 'relative',
    width: 280,
    height: 560,
    background: '#1a1a1a',
    borderRadius: 40,
    border: `2px solid ${GOLD}`,
    boxShadow: `0 0 40px rgba(212,175,55,0.25), 0 20px 60px rgba(0,0,0,0.6)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: "'Montserrat', -apple-system, sans-serif",
  },
  notch: {
    width: 100,
    height: 24,
    background: '#1a1a1a',
    borderRadius: '0 0 16px 16px',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  screen: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(160deg, #0d0d0d 0%, #1c1c1e 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '36px 12px 20px',
    boxSizing: 'border-box',
    gap: 12,
  },
  statusBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 8px',
    marginBottom: 8,
  },
  statusTime: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
  },
  statusIcons: {
    color: '#fff',
    fontSize: 9,
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  notification: {
    width: '100%',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    padding: '12px 14px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  notifHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  waIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  appLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    flex: 1,
  },
  notifTime: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
  },
  notifBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  sender: {
    color: GOLD,
    fontSize: 13,
    fontWeight: 700,
  },
  message: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    lineHeight: 1.5,
    margin: 0,
  },
  lockHint: {
    marginTop: 'auto',
    color: 'rgba(255,255,255,0.3)',
    fontSize: 11,
    letterSpacing: '0.04em',
  },
  homeBar: {
    position: 'absolute',
    bottom: 8,
    width: 100,
    height: 4,
    background: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
};

export default PhoneNotification;
