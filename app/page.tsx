
'use client'

import { motion } from 'framer-motion';
import { Volume2, Sparkles, Palette } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Animation for fade-in and CTA pulse
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center bg-[#1C1C1E] overflow-x-hidden">

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center z-10 w-full px-4">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-[2.8rem] md:text-6xl font-medium text-[#EAEAEA] text-center mb-6 mt-24 drop-shadow-lg"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Your Inner World is a Work of Art.
        </motion.h1>

        {/* Inspiring paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
          className="text-lg md:text-2xl text-[#EAEAEA] text-center max-w-2xl mb-12 font-light leading-relaxed"
          style={{ fontFamily: 'Lato, Source Sans Pro, sans-serif', lineHeight: 1.7 }}
        >
          Echo Canvas is a sanctuary created for you. A quiet space where every feeling, every thought, and every sound—spoken or unspoken—is transformed into visual art. This is a journey of expression and healing, open to people of all abilities.
        </motion.p>

        {/* Three-step visual explanation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center mb-16"
        >
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <Volume2 className="w-10 h-10 mb-2 text-[#A3B18A]" aria-hidden="true" />
            <div className="text-[#EAEAEA] font-semibold mb-1">1. Express Yourself</div>
            <div className="text-[#EAEAEA] text-sm text-center opacity-80">Use your voice, a hum, a sigh, or type a feeling.</div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <Sparkles className="w-10 h-10 mb-2 text-[#A3B18A]" aria-hidden="true" />
            <div className="text-[#EAEAEA] font-semibold mb-1">2. Translate Your Echo</div>
            <div className="text-[#EAEAEA] text-sm text-center opacity-80">Our creative AI listens and translates your unique input into an artistic direction.</div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <Palette className="w-10 h-10 mb-2 text-[#A3B18A]" aria-hidden="true" />
            <div className="text-[#EAEAEA] font-semibold mb-1">3. Discover Your Art</div>
            <div className="text-[#EAEAEA] text-sm text-center opacity-80">Watch as your inner world is revealed as a one-of-a-kind visual masterpiece.</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 0 8px #FFD58044' }}
          onClick={() => router.push('/canvas')}
          className="mt-2 mb-10 px-12 py-5 rounded-2xl text-2xl font-semibold bg-[#A3B18A] text-[#EAEAEA] shadow-lg  transition-all duration-200 cursor-pointer"
          style={{ boxShadow: '0 2px 32px 0 #A3B18A33' }}
          aria-label="Begin your creation"
        >
          Begin Your Creation
        </motion.button>
      </main>

      {/* Minimal footer */}
      <footer className="w-full flex justify-center items-center py-6 z-10">
        <nav className="flex gap-6 text-xs text-[#5A5A5A]">
          <a href="#" className="hover:underline">About Echo Canvas</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
}
