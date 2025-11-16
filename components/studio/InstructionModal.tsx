'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import ActionButton from '@/components/common/ActionButton';
import SpeakingOrb from '@/components/canvas/SpeakingOrb';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  instructionText: string;
  onSubmit: (instruction: string, audioBlob?: Blob) => void;
  isLoading?: boolean;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
  title,
  instructionText,
  onSubmit,
  isLoading = false,
}) => {
  const [instruction, setInstruction] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined);


  const handleSubmit = () => {
    onSubmit(instruction, audioBlob);
    setInstruction('');
    setAudioBlob(undefined);
  };

  const handleAudioCaptured = (blob: Blob) => {
    console.log('Audio captured in InstructionModal:', blob);
    onSubmit(instruction, blob);
    setInstruction('');
    setAudioBlob(undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-[#1C1C1E] rounded-lg p-8 w-full max-w-md shadow-xl border border-[#3A3A3C]"
      >
        <h2 className="text-2xl font-bold text-[#EAEAEA] mb-4">{title}</h2>
        <p className="text-[#EAEAEA] mb-6">{instructionText}</p>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-[#A3B18A]" />
            </motion.div>
            <p className="mt-4 text-lg font-semibold text-[#EAEAEA]">Echoing your vision...</p>
          </motion.div>
        ) : (
          <>
            <textarea
              className="w-full p-3 bg-[#3A3A3C] text-[#EAEAEA] rounded-lg border border-[#A3B18A] focus:outline-none focus:ring-2 focus:ring-[#A3B18A] resize-none mb-4"
              rows={4}
              placeholder="Type your instructions here..."
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            ></textarea>

            <div className="flex justify-between items-center">
              
                <SpeakingOrb isTextFocused={false} onAudioCaptured={handleAudioCaptured}  size="60" iconSize="w-6 h-6" />
            
              <div className="flex gap-4">
                <ActionButton
                  onClick={onClose}
                  label="Cancel"
                  icon={X}
                  className="px-6 py-2 bg-gray-600 text-[#EAEAEA] rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                />
                <ActionButton
                  onClick={handleSubmit}
                  label="Submit"
                  icon={Check}
                  className="px-6 py-2 bg-[#A3B18A] text-[#1C1C1E] rounded-lg font-semibold hover:bg-[#B3C19A] transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default InstructionModal;