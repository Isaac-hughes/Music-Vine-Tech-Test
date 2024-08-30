import { useState, useEffect } from "react";

type AudioManager = {
  currentAudio: HTMLAudioElement | null;
  isPlaying: string | null;
  playAudio: (uri: string, trackId: string) => void;
  stopAudio: () => void;
};

export const useAudioManager = (): AudioManager => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const playAudio = (uri: string, trackId: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    const newAudio = new Audio(uri);
    newAudio.play();
    setCurrentAudio(newAudio);
    setIsPlaying(trackId);

    newAudio.onended = () => {
      setIsPlaying(null);
      setCurrentAudio(null);
    };
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(null);
  };

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  return { currentAudio, isPlaying, playAudio, stopAudio };
};
