'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeakingOrb from '@/components/canvas/SpeakingOrb';
import { useRouter } from 'next/navigation';

const CreationPage = () => {
  const router = useRouter();  
  const [textInput, setTextInput] = useState('');
  const [isTextFocused, setIsTextFocused] = useState(false);

  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSpeechRecognized = (text: string) => {
    setTextInput(text);
  };

  return (
    <div className="relative min-h-screen bg-[#1C1C1E] flex flex-col items-center justify-center px-4 overflow-hidden pt-24">
      {/* Instructions */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-2xl text-[#EAEAEA] text-lg md:text-xl mb-12"
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
      >
        Describe a feeling, a memory, or a scene... or simply press and hold the orb to use your voice.
      </motion.p>

      {/* Main Content Container */}
      <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
        {/* Central Orb */}
        <SpeakingOrb isTextFocused={isTextFocused} onSpeechRecognized={handleSpeechRecognized} />

        {/* Text Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="w-full flex flex-col items-center gap-4"
        >
          <textarea
            ref={textInputRef}
            placeholder="Or, type your vision here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onFocus={() => setIsTextFocused(true)}
            onBlur={() => setIsTextFocused(false)}
            className="w-full max-w-xl px-4 py-3 bg-[#3A3A3C] text-[#EAEAEA] rounded-lg border-b-2 border-[#A3B18A] placeholder-[#EAEAEA]/40 focus:outline-none focus:ring-2 focus:ring-[#A3B18A] focus:ring-offset-2 focus:ring-offset-[#1C1C1E] transition-all resize-none"
            aria-label="Text field. Describe your vision or feeling."
            style={{ fontFamily: 'var(--font-source-sans)' }}
            rows={3}
          ></textarea>

          {/* Create Button - appears when text is entered */}
          <AnimatePresence>
            {textInput.trim() && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-3 bg-[#A3B18A] text-[#EAEAEA] rounded-lg font-semibold hover:bg-[#B3C19A] focus:outline-none cursor-pointer"
                style={{ fontFamily: 'var(--font-source-sans)' }}
                onClick={() => router.push(`/studio?text_prompt=${encodeURIComponent(textInput)}`)}
              >
                Generate Canvas
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CreationPage;
