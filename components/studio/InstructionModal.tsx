'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Check, X, Loader2 } from 'lucide-react';
import ActionButton from '@/components/common/ActionButton';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  instructionText: string;
  onSubmit: (instruction: string) => void;
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
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (transcript) {
      setInstruction((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setTranscript('');
    }
  }, [transcript]);

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcription
      setTimeout(() => {
        setTranscript('Simulated voice input: Make it more vibrant and add a touch of gold.');
      }, 1000);
    } else {
      setIsRecording(true);
      setInstruction(''); // Clear previous instruction when starting new recording
    }
  };

  const handleSubmit = () => {
    onSubmit(instruction);
    setInstruction('');

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

            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center mb-4 text-[#A3B18A]"
              >
                <span className="mr-2">Recording...</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-[#A3B18A] rounded-full"
                />
              </motion.div>
            )}

            <div className="flex justify-between items-center">
              <ActionButton
                onClick={handleMicClick}
                icon={Mic}
                label=""
                className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[#A3B18A] hover:bg-[#B3C19A]'}`}
              />
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