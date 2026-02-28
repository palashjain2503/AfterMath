import { Mic, MicOff } from 'lucide-react';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useEffect } from 'react';

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
}

const VoiceRecorder = ({ onTranscript }: VoiceRecorderProps) => {
  const { isRecording, transcript, startRecording, stopRecording } = useVoiceRecorder();

  useEffect(() => {
    if (transcript) onTranscript(transcript);
  }, [transcript, onTranscript]);

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-4 rounded-xl transition-all ${isRecording ? 'bg-destructive text-destructive-foreground pulse-mic' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
      aria-label={isRecording ? 'Stop recording' : 'Start recording'}
    >
      {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
    </button>
  );
};

export default VoiceRecorder;
