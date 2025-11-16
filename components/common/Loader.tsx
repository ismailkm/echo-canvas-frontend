import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-[#1C1C1E] z-50"
      >
        <div className="flex flex-col items-center">
          <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1
        }}
        className="w-16 h-16 border-4 border-t-4 border-t-[#A3B18A] border-[#3A3A3C] rounded-full"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-[#EAEAEA] text-lg font-medium"
      >
        Crafting your masterpiece...
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-2 text-[#929292] text-base"
      >
        This might take a moment, please wait.
      </motion.p>
        </div>
    </motion.div>
  );
};

export default Loader;