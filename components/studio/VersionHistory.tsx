import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Version } from '@/types/sessions';

interface VersionHistoryProps {
  versions: Version[];
  selectedVersionId: string | null;
  onSelectVersion: (version: Version) => void;
  className?: string;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({
  versions,
  selectedVersionId,
  onSelectVersion,
  className
}) => {
  return (
    <div className={`w-full h-full p-4 bg-[#2A2A2C] justify-center items-center rounded-lg overflow-y-auto ${className}`}>
      <h2 className="text-xl font-bold mb-4 text-[#EAEAEA]">Creative History</h2>
      <div className="flex flex-row flex-wrap justify-left items-center gap-4">
        {versions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`relative w-48 h-48 rounded-lg overflow-hidden cursor-pointer transition-all duration-200
              ${selectedVersionId === version.id ? 'ring-4 ring-[#FFD580]' : 'hover:ring-2 hover:ring-[#A3B18A]'}`}
            onClick={() => onSelectVersion(version)}
          >
            <Image
              src={version.image_url}
              alt={`Version ${version.id}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {version.id}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;