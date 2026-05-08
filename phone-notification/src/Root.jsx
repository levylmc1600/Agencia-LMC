import { Composition } from 'remotion';
import PhoneNotification from './PhoneNotification';

export function RemotionRoot() {
  return (
    <Composition
      id="PhoneNotification"
      component={PhoneNotification}
      durationInFrames={180}
      fps={30}
      width={1080}
      height={1920}
    />
  );
}
