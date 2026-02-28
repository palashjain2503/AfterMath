import { Mic, MicOff } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useEffect } from 'react';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onAudio?: (audioBase64: string) => void;
}

const VoiceRecorder = ({ onTranscript, onAudio }: VoiceRecorderProps) => {
  const { isRecording, transcript, startRecording, stopRecording } = useVoiceRecorder();

  useEffect(() => {
    if (transcript) onTranscript(transcript);
  }, [transcript, onTranscript]);

  const handleStop = async () => {
    const audio = await stopRecording();
    if (audio && onAudio) {
      onAudio(audio);
    }
  };

  return (
    <button
      onClick={isRecording ? handleStop : startRecording}
      className={`p-4 rounded-xl transition-all ${isRecording ? 'bg-destructive text-destructive-foreground pulse-mic' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
    </button>
  );
};

export default VoiceRecorder;
