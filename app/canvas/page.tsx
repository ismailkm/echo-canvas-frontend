'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpeakingOrb from '@/components/canvas/SpeakingOrb';
import { useRouter } from 'next/navigation';
import { useAudioStore } from '@/lib/stores/audioStore';

const CreationPage = () => {
  const router = useRouter();  

  const [isTextFocused, setIsTextFocused] = useState(false);
  const [textInput, setTextInput] = useState('');
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const { setAudioBlob, clearAudioBlob } = useAudioStore();


  const handleAudioCaptured = (blob: Blob) => {
    setAudioBlob(blob);
    router.push('/studio');
  };

  useEffect(() => {
    clearAudioBlob();
  }, [clearAudioBlob]);

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
        <SpeakingOrb isTextFocused={isTextFocused} onAudioCaptured={handleAudioCaptured} />

        <motion.textarea
          ref={textInputRef}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onFocus={() => setIsTextFocused(true)}
          onBlur={() => setIsTextFocused(false)}
          placeholder="Type your prompt here..."
          className="w-full p-4 rounded-lg bg-[#2C2C2E] text-[#EAEAEA] placeholder-[#929292] focus:outlinea_none focus:ring-2 focus:ring-[#A3B18A] text-lg md:text-xl resizea_none"
          rows={3}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ fontFamily: 'var(--fonta_inter)' }}
        />

        {textInput.trim() ? (
          <motion.button
            onClick={() => {
              router.push(`/studio?text_prompt=${encodeURIComponent(textInput)}`);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="px-8 py-3 rounded-full bg-[#A3B18A] text-[#1C1C1E] text-lg font-bold shadow-lg hover:bg-[#8B9B72] transition-colors"
            style={{ fontFamily: 'var(--fonta_inter)' }}
          >
            Generate Canvas
          </motion.button>
        ) : null}
      </div>
    </div>
  );
};

export default CreationPage;
