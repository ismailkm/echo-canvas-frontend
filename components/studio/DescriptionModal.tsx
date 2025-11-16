import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, X, Square} from 'lucide-react';
import ActionButton from '@/components/common/ActionButton';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string | null;
  isLoading: boolean;
  engagingText: string;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  description,
  isLoading,
  engagingText,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleTogglePlay = () => {
    if (!description) return;

    if (!isPlaying && !isPaused) {
      speak(description);
    } else if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    }
  };

  const handleStop = () => {
    stop();
  };

  // Close modal and stop speech
  const handleClose = () => {
    stop();
    onClose();
  };

  // Get button state and text
  const getPlayButtonState = () => {
    if (!description) {
      return { icon: VolumeX, text: 'No Text', disabled: true };
    }
    if (isPlaying && !isPaused) {
      return { icon: Pause, text: 'Pause', disabled: false };
    }
    if (isPaused) {
      return { icon: Play, text: 'Resume', disabled: false };
    }
    return { icon: Volume2, text: 'Read Aloud', disabled: false };
  };

  const playButtonState = getPlayButtonState();
  const PlayButtonIcon = playButtonState.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-[#1C1C1E] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-[#3A3A3C]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#EAEAEA]">Artwork Description</h2>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-12 h-12 border-4 border-[#A3B18A] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#EAEAEA] text-lg text-center">{engagingText}</p>
              </div>
            ) : description ? (
              <div className="mb-6">
                <p className="text-[#EAEAEA] leading-relaxed bg-[#2C2C2E] p-4 rounded-lg border border-[#3A3A3C]">
                  {description}
                </p>
              </div>
            ) : (
              <p className="text-[#EAEAEA] mb-6 text-center py-8 bg-[#2C2C2E] rounded-lg border border-[#3A3A3C]">
                No description available.
              </p>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <ActionButton
                  onClick={handleTogglePlay}
                  disabled={playButtonState.disabled}
                  icon={PlayButtonIcon}
                  label={playButtonState.text}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-xl font-semibold 
                    transition-all duration-300 transform hover:scale-105 
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
                    ${isPlaying && !isPaused 
                      ? 'bg-[#D4A574] text-[#1C1C1E] hover:bg-[#E4B584]' 
                      : isPaused 
                        ? 'bg-[#F4C484] text-[#1C1C1E] hover:bg-[#FFD494]'
                        : 'bg-[#A3B18A] text-[#1C1C1E] hover:bg-[#B3C19A]'
                    }
                  `}
                />

                {/* Stop Button - Only show when playing/paused */}
                {(isPlaying || isPaused) && (
                  <ActionButton
                    onClick={handleStop}
                    icon={Square}
                    label="Stop"
                    className="flex items-center gap-2 px-3 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  />
                )}
              </div>

              {/* Close Button */}
              <ActionButton
                onClick={handleClose}
                label="Close"
                icon={X}
                className="px-6 py-3 bg-gray-600 text-[#EAEAEA] rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DescriptionModal;