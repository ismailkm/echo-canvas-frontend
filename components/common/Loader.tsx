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
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1
        }}
        className="w-16 h-16 border-4 border-t-4 border-t-[#A3B18A] border-[#3A3A3C] rounded-full"
      />
    </motion.div>
  );
};

export default Loader;