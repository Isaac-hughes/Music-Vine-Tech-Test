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

  // Function to play audio
  const playAudio = (uri: string, trackId: string) => {
    // Stop currently playing audio if any
    if (currentAudio) {
      currentAudio.pause();
    }

    // Create and play new audio
    const newAudio = new Audio(uri);
    newAudio.play();
    setCurrentAudio(newAudio);
    setIsPlaying(trackId);

    // Handle audio end event
    newAudio.onended = () => {
      setIsPlaying(null);
      setCurrentAudio(null);
    };
  };

  // Function to stop audio
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    setIsPlaying(null);
  };

  // Stop audio when component unmounts or when a new search occurs
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  return { currentAudio, isPlaying, playAudio, stopAudio };
};
