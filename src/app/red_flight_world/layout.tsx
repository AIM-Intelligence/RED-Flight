'use client';

import { useEffect, useRef } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      // 페이지 로드시 자동 재생
      audioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
    }

    // 컴포넌트 언마운트 시 오디오 정지
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <main>
      <audio ref={audioRef} src="/audio/story.mp3" loop />
      {children}
    </main>
  );
};

export default Layout;
