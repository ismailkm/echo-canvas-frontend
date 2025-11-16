import React from 'react';
import { Version } from '@/types/sessions';

interface MetadataDisplayProps {
  selectedVersion: Version | null;
}

const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ selectedVersion }) => {
  if (!selectedVersion) {
    return null;
  }

  return (
    <div className="bg-[#2A2A2C] rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Selected Version Details</h2>
      <p className="font-bold text-lg mb-2">{selectedVersion.prompt}</p>
      <p className="text-md mb-4">Version: {selectedVersion.version_number}</p>

      <div>
        <p className="font-semibold">Prompt Components:</p>
        {selectedVersion.prompt_components && Object.entries(selectedVersion.prompt_components).map(([key, value]) => (
          <p key={key} className="text-sm font-medium"><span className="font-bold capitalize">{key.replace(/_/g, ' ')}</span>: {value}</p>
        ))}
      </div>
    </div>
  );
};

export default MetadataDisplay;