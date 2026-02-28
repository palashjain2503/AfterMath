import { useState, useCallback } from 'react';

export const useVoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecording = useCallback(() => {
    setIsRecording(true);
    // Mock: simulate recording for 3 seconds
    setTimeout(() => {
      setTranscript("I'm feeling good today, had breakfast with my daughter.");
      setIsRecording(false);
    }, 3000);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  return { isRecording, transcript, startRecording, stopRecording };
};
