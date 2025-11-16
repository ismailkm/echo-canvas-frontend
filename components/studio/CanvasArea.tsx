'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CanvasAreaProps {
  imageUrl: string;
  className?: string;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  imageUrl,
  className
}) => {
  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      {/* Image Display */}
      <motion.div
        key={imageUrl} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-3xl aspect-square bg-[#2A2A2C] rounded-lg shadow-lg overflow-hidden"
        style={{ border: '8px solid #3A3A3C', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }} 
      >
        <Image
          src={imageUrl}
          alt="Generated Artwork"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />

      </motion.div>


    </div>
  );
};

export default CanvasArea;