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

  // Curated sample prompts with detailed descriptions
  const samplePrompts = [
    {
      category: "Emotional Landscapes",
      description: "Describe feelings as visual scenes for deeper emotional resonance",
      prompts: [
        "A peaceful sunset over calm ocean waves with soft golden light reflecting on the water, creating a serene and tranquil atmosphere that evokes inner peace",
        "Melancholic rain on a quiet afternoon with grey skies and gentle droplets tracing paths on windowpanes, capturing reflective solitude and quiet contemplation"
      ]
    },
    {
      category: "Memory & Experience",
      description: "Transform personal memories into vivid artistic expressions",
      prompts: [
        "My childhood backyard in summer with dappled sunlight filtering through oak trees, a wooden swing moving gently in the breeze, and the scent of fresh cut grass in the air",
        "A cozy winter evening by the fireplace with warm orange glow casting long shadows, steaming hot cocoa on a wooden table, and snow falling softly outside frosted windows"
      ]
    },
    {
      category: "Color Accessibility",
      description: "Specify color vision needs for optimized visual experiences",
      prompts: [
        "A vibrant forest scene with lush greenery and colorful wildflowers, optimized for deuteranopia by using blue-purple and teal contrasts instead of red-green combinations",
        "Sunset over mountains with dramatic sky gradients, designed for protanopia with strong blue-yellow contrast and clear luminance differences for maximum visibility"
      ]
    },
    {
      category: "Abstract Concepts",
      description: "Give form to intangible feelings and ideas",
      prompts: [
        "The feeling of anxiety as a stormy sea with turbulent waves, dark swirling clouds, and occasional lightning strikes representing moments of panic and unease",
        "Inner peace as a tranquil Japanese zen garden with raked sand patterns, carefully placed stones, and minimal cherry blossoms in soft morning light"
      ]
    },
    {
      category: "Artistic Styles",
      description: "Reference specific art styles for consistent visual direction",
      prompts: [
        "Watercolor dreamscape of a floating city in the clouds with soft blended edges, translucent layers, and ethereal light creating a magical atmosphere",
        "Impressionist garden in full spring bloom with visible brushstrokes, dappled sunlight effects, and vibrant color patches that blend at a distance"
      ]
    },
    {
      category: "Inner World Expressions",
      description: "Give voice to unspoken feelings and personal experiences",
      prompts: [
        "The weight of depression as a heavy grey fog enveloping a solitary figure, with distant pinpricks of light representing hope struggling to break through the overwhelming atmosphere",
        "Frustration as a tangled knot of vibrant conflicting colors and sharp geometric shapes, with chaotic energy and tense composition expressing inner turmoil and unresolved feelings"
      ]
    }
  ];

  const handleAudioCaptured = (blob: Blob) => {
    setAudioBlob(blob);
    sessionStorage.setItem('fromCanvas', 'true');
    router.push('/studio');
  };

  const handleSampleClick = (prompt: string) => {
    setTextInput(prompt);
    textInputRef.current?.focus();
  };

  useEffect(() => {
    clearAudioBlob();
  }, [clearAudioBlob]);

  const handleGenerateClick = () => {
    sessionStorage.setItem('fromCanvas', 'true');
    router.push(`/studio?text_prompt=${encodeURIComponent(textInput)}`);
  };

  const hasTextInput = textInput.trim().length > 0;

  return (
    <div className="relative min-h-screen bg-[#1C1C1E] flex flex-col items-center justify-center px-6 overflow-hidden pt-24">
      {/* Instructions */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-4xl text-[#EAEAEA] text-lg md:text-xl mb-12"
        style={{ fontFamily: 'var(--font-inter)', fontWeight: 500 }}
      >
        Describe a feeling, a memory, or a scene... or simply press and hold the orb to use your voice.
      </motion.p>

      {/* Main Content Container */}
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
        {/* Central Orb */}
        <SpeakingOrb size="200" iconSize="w-12 h-12" isTextFocused={isTextFocused} onAudioCaptured={handleAudioCaptured} />

        {/* Text Input */}
        <motion.textarea
          ref={textInputRef}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onFocus={() => setIsTextFocused(true)}
          onBlur={() => setIsTextFocused(false)}
          placeholder="Give voice to your inner world... Describe emotions, memories, or experiences in detail. Include accessibility needs or artistic preferences for best results."
          className="w-full max-w-4xl p-6 rounded-xl bg-[#2C2C2E] text-[#EAEAEA] placeholder-[#929292] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] text-lg md:text-xl resize-none"
          rows={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ fontFamily: 'var(--font-inter)' }}
        />

        {/* Generate Button - Only shows when there's text input */}
        <AnimatePresence>
          {hasTextInput && (
            <motion.button
              onClick={handleGenerateClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="px-12 py-4 rounded-full bg-[#A3B18A] text-[#1C1C1E] text-xl font-bold shadow-2xl hover:bg-[#8B9B72] hover:scale-105 transition-all duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              🎨 Give Voice to Your Vision
            </motion.button>
          )}
        </AnimatePresence>

        {/* Sample Prompts Section - Always shows when no text input */}
        <AnimatePresence>
          {!hasTextInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-6xl"
            >
              <div className="text-center mb-8">
                <h3 className="text-[#A3B18A] text-xl font-semibold mb-3">
                  Give Voice to Your Inner World:
                </h3>
                <p className="text-[#929292] text-base max-w-3xl mx-auto leading-relaxed">
                  Detailed descriptions create better artwork. Express <span className="text-[#A3B18A]">emotions</span>, 
                  <span className="text-[#A3B18A]"> personal experiences</span>, 
                  <span className="text-[#A3B18A]"> accessibility needs</span> like "deuteranopia friendly", or 
                  <span className="text-[#A3B18A]"> artistic visions</span> to transform your inner world into art.
                </p>
              </div>
              
              {/* Grid with category descriptions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-h-96 overflow-y-auto p-2">
                {samplePrompts.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4 p-4 rounded-xl bg-[#2C2C2E]/50 border border-[#3C3C3E]">
                    <div>
                      <h4 className="text-[#EAEAEA] text-lg font-semibold mb-2">
                        {category.category}
                      </h4>
                      <p className="text-[#929292] text-sm leading-relaxed mb-3">
                        {category.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {category.prompts.map((prompt, promptIndex) => (
                        <motion.button
                          key={promptIndex}
                          onClick={() => handleSampleClick(prompt)}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-4 rounded-lg bg-[#2C2C2E] hover:bg-[#3C3C3E] text-[#EAEAEA] text-sm leading-relaxed transition-all duration-200 border border-[#3C3C3E] hover:border-[#A3B18A] hover:shadow-lg"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Educational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-[#929292] text-sm max-w-4xl space-y-2"
      >
        <p>
          🎨 <strong>Echo Canvas:</strong> Transforming inner worlds into visible art. Your emotions, memories, and experiences deserve expression.
        </p>
        <p>
          💡 <strong>Express Yourself Fully:</strong> Include specific emotions (joyful, melancholic, anxious, frustrated), 
          mention color accessibility needs, or describe personal experiences in detail.
        </p>
        <p>
          🌈 <strong>Accessible to All:</strong> Add "deuteranopia friendly", "protanopia optimized", or "high contrast" 
          to ensure your artistic expression reaches everyone.
        </p>
      </motion.div>
    </div>
  );
};

export default CreationPage;