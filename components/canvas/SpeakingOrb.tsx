'use client';

import { useRef, useEffect, useState } from 'react';
import { Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeakingOrbProps {
  isTextFocused: boolean;
  onSpeechRecognized: (text: string) => void;
}

const SpeakingOrb: React.FC<SpeakingOrbProps> = ({ isTextFocused, onSpeechRecognized }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analyserData, setAnalyserData] = useState<Uint8Array | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const currentRecognitionRef = useRef<any>(null);
  const currentTranscriptRef = useRef<string>('');

  // Initialize audio context and analyser
  const initializeAudio = async () => {
    if (audioContextRef.current) return audioContextRef.current;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      return audioContext;
    } catch (err) {
      console.error('Error accessing microphone:', err);
      return null;
    }
  };

  // Start recording and visualizer
  const handleOrbPress = async () => {
    if (isRecording) return;

    const audio = await initializeAudio();
    if (!audio) return;

    setIsRecording(true);
    mediaRecorderRef.current?.start();

    // Start speech recognition
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const newTranscript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        currentTranscriptRef.current = newTranscript;
        onSpeechRecognized(currentTranscriptRef.current);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
      currentRecognitionRef.current = recognition; // Store the current recognition instance
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }

    // Update analyser data in animation loop
    const updateVisualizer = () => {
      if (!analyserRef.current) return;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      setAnalyserData(dataArray);
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  };

  // Stop recording
  const handleOrbRelease = () => {
    if (!isRecording) return;

  
    setIsRecording(false);
    mediaRecorderRef.current?.stop();

    // Stop speech recognition
    if (currentRecognitionRef.current) {
      currentRecognitionRef.current.stop();
      currentRecognitionRef.current = null; // Clear the ref after stopping
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Fade out visualizer
    setTimeout(() => {
      setAnalyserData(null);
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (currentRecognitionRef.current) {
        currentRecognitionRef.current.stop();
      }
    };
  }, []);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTextFocused) {
      e.preventDefault();
      handleOrbPress();
    }
  };

  const handleMouseUp = () => {
    handleOrbRelease();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTextFocused) {
      e.preventDefault();
      handleOrbPress();
    }
  };

  const handleTouchEnd = () => {
    handleOrbRelease();
  };

  // Mouse/Touch events for orb


  // Calculate ripple dimensions based on frequency data
  const getRippleScale = () => {
    if (!analyserData) return 0;
    const average = analyserData.reduce((a, b) => a + b) / analyserData.length;
    return Math.min(average / 255, 1);
  };

  const getRippleColor = () => {
    if (!analyserData) return '#A3B18A';
    const average = analyserData.reduce((a, b) => a + b) / analyserData.length;
    // Shift towards amber as volume increases
    if (average > 180) return '#FFD580';
    if (average > 120) return '#D4C99E';
    return '#A3B18A';
  };

  return (
    <motion.div
      ref={orbRef}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: isTextFocused ? 0.5 : 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-32 h-32 md:w-40 md:h-40"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Orb background */}
      <motion.div
        animate={{ scale: isRecording ? 1.1 : 1 }}
        transition={{
          duration: isRecording ? 0.3 : 3,
          repeat: isRecording ? 0 : Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
        className="w-full h-full rounded-full bg-[#A3B18A] flex items-center justify-center cursor-pointer shadow-lg"
        aria-label="Button. Create with your voice. Press and hold to record."
        role="button"
        tabIndex={isTextFocused ? -1 : 0}
      >
        {/* Microphone icon (fades when recording) */}
        <motion.div
          animate={{ opacity: isRecording ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Mic className="w-16 h-16 md:w-20 md:h-20 text-[#EAEAEA]" aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* Visualizer ripples */}
      <AnimatePresence>
        {isRecording && (
          <>
            {[1, 2, 3, 4, 5].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="rounded-full border-2 pointer-events-none"
                style={{
                  position: 'absolute',
                  borderColor: getRippleColor(),
                  width: '120%',
                  height: '120%',
                  top: -15,
                  left: -15,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: 1 + getRippleScale() * (0.7 + ring * 0.15),
                  opacity: [1, 0.3],
                }}
                transition={{
                  duration: 0.2,
                  delay: ring * 0.03,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Recording indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#A3B18A] text-[#1C1C1E] rounded-full font-semibold text-sm"
            style={{ fontFamily: 'var(--font-source-sans)' }}
          >
            Recording... Release to save
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpeakingOrb;