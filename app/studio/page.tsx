'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import CanvasArea from '@/components/studio/CanvasArea';
import VersionHistory from '@/components/studio/VersionHistory';
import { Version, Session } from '@/types/sessions';
import MetadataDisplay from '@/components/studio/MetadataDisplay';
import Loader from '@/components/common/Loader';
import { describeImage, updateImage, refineImage, generateImage } from '@/services/images';
import { getSession } from '@/services/sessions';
import { processSessionData } from '@/utils/session';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAudioStore } from '@/lib/stores/audioStore';
import DescriptionModal from '@/components/studio/DescriptionModal';
import InstructionModal from '@/components/studio/InstructionModal';
import { Speaker, Stars, Pencil, Plus } from 'lucide-react';
import ActionButton from '@/components/common/ActionButton';

// Extract the component that uses useSearchParams
function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTextPrompt = searchParams.get('text_prompt');
  const { audioBlob, clearAudioBlob } = useAudioStore();

  const [session, setSession] = useState<Session | null>(null);
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState<boolean>(false);
  const [isDescribingImage, setIsDescribingImage] = useState<boolean>(false);
  const [imageDescription, setImageDescription] = useState<string | null>(null);
  const [isReimagineModalOpen, setIsReimagineModalOpen] = useState<boolean>(false);
  const [isReimagining, setIsReimagining] = useState<boolean>(false);
  const [isRefineModalOpen, setIsRefineModalOpen] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);

  // Use ref to track if we've already fetched data
  const hasFetched = useRef(false);

  const handleImageUpdate = (newVersion: Version) => {
    setSelectedVersion(newVersion);
  };

  const handleDescribeImage = async () => {
    if (!selectedVersion?.gcs_uri) {
      alert('No image available to describe.');
      return;
    }
    setIsDescriptionModalOpen(true);
    setIsDescribingImage(true);
    setImageDescription(null);
    try {
      const data = await describeImage(selectedVersion.gcs_uri);
      setImageDescription(data.description);
    } catch (error) {
      console.error('Error describing image:', error);
      alert('Failed to describe image. Please try again.');
      setImageDescription('Failed to generate description.');
    } finally {
      setIsDescribingImage(false);
    }
  };

  const handleCloseDescriptionModal = () => {
    setIsDescriptionModalOpen(false);
  };

  const handleReimagine = () => {
    setIsReimagineModalOpen(true);
  };

  const handleCloseReimagineModal = () => {
    setIsReimagineModalOpen(false);
  };

  const handleRefine = () => {
    setIsRefineModalOpen(true);
  };

  const handleCloseRefineModal = () => {
    setIsRefineModalOpen(false);
  };

  const handleReimagineSubmit = async (instruction: string) => {
    if (!session?.id) {
      alert('Session not found.');
      return;
    }
    setIsReimagining(true);
    try {
      const newSession = await updateImage(session.id, instruction);
      const { transformedVersions, initialSelectedVersion } = processSessionData(newSession);
      setSession(newSession);
      setVersions(transformedVersions);
      setSelectedVersion(initialSelectedVersion);
      setIsReimagineModalOpen(false);
    } catch (error) {
      alert('Failed to reimagine image. Please try again.');
    } finally {
      setIsReimagining(false);
    }
  };

  const handleRefineSubmit = async (instruction: string) => {
    if (!session?.id) {
      alert('Session not found.');
      return;
    }
    if (!selectedVersion?.gcs_uri) {
      alert('No image selected for refinement.');
      return;
    }
    setIsRefining(true);
    try {
      const newSession = await refineImage(session.id, selectedVersion.gcs_uri, instruction);
      const { transformedVersions, initialSelectedVersion } = processSessionData(newSession);
      setSession(newSession);
      setVersions(transformedVersions);
      setSelectedVersion(initialSelectedVersion);
      setIsRefineModalOpen(false);
    } catch (error) {
      alert('Failed to refine image. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };

  useEffect(() => {
    console.log('StudioPage useEffect - Running fetchData');
    
    // Prevent double API calls
    if (hasFetched.current) {
      console.log('Already fetched data, skipping');
      return;
    }
    
    if (!initialTextPrompt && !audioBlob) {
      console.log('No initial text prompt or audio, skipping fetch');
      return;
    }

    const fetchData = async () => {
      hasFetched.current = true;
      console.log('Fetching session data...');
      
      try {
        let sessionData;
        if (audioBlob) {
          console.log('Generating image from audio blob');
          sessionData = await generateImage({ audioBlob });
        } else if (initialTextPrompt) {
          console.log('Generating image from text prompt:', initialTextPrompt);
          sessionData = await generateImage({ text_prompt: initialTextPrompt });
        } else {
          router.push('/canvas');
          return;
        }
        
        console.log('Session data received:', sessionData);
        const { transformedVersions, initialSelectedVersion } = processSessionData(sessionData);
        setSession(sessionData);
        setVersions(transformedVersions);
        setSelectedVersion(initialSelectedVersion);
        
        // Clear audio blob after successful generation
        if (audioBlob) {
          clearAudioBlob();
        }
        
        console.log('Data set successfully');
      } catch (error) {
        console.error('Error fetching session:', error);
        router.push('/canvas');
      }
    };

    fetchData();
  }, [initialTextPrompt, audioBlob, router, clearAudioBlob]);

  if (!session || !selectedVersion || versions.length === 0) {
    return (
      <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-[#EAEAEA] p-4 pt-16 flex flex-col md:flex-row overflow-y-auto">
      {/* Left Column (Metadata) */}
      <div className="w-full md:w-2/8 p-4 flex-shrink-0 flex-grow-0">
        <MetadataDisplay selectedVersion={selectedVersion} />
      </div>

      {/* Center Column (Canvas Area) */}
      <div className="w-full md:w-4/8 p-4 flex-shrink-0 flex-grow-0">
        <CanvasArea
          imageUrl={selectedVersion.image_url}
        />
        {/* Action Buttons */}
        <div className="flex gap-4 items-center justify-center mt-4 z-10">
          <ActionButton
            onClick={handleDescribeImage}
            label="Describe"
            icon={Speaker}
          />
          <ActionButton
            onClick={handleReimagine}
            label="Reimagine"
            icon={Stars}
          />
          <ActionButton
            onClick={handleRefine}
            label="Refine"
            icon={Pencil}
          />
          <ActionButton
            onClick={() => router.push('/canvas')}
            label="Create New"
            icon={Plus}
          />
        </div>
      </div>

      {/* Right Column (Version History) */}
      <div className="w-full md:w-2/8 p-4 flex-shrink-0 flex-grow-0">
        <VersionHistory
          versions={versions}
          selectedVersionId={selectedVersion.id}
          onSelectVersion={handleImageUpdate}
        />
      </div>

      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={handleCloseDescriptionModal}
        description={imageDescription}
        isLoading={isDescribingImage}
        engagingText="Analyzing the canvas... Unveiling its secrets..."
      />

      <InstructionModal
        isOpen={isReimagineModalOpen}
        onClose={handleCloseReimagineModal}
        title="Reimagine Artwork"
        instructionText="Describe how you want to reimagine the artwork. Be creative!"
        onSubmit={handleReimagineSubmit}
        isLoading={isReimagining}
      />

      <InstructionModal
        isOpen={isRefineModalOpen}
        onClose={handleCloseRefineModal}
        title="Refine Artwork"
        instructionText="Describe how you want to refine the artwork. Be specific!"
        onSubmit={handleRefineSubmit}
        isLoading={isRefining}
      />
    </div>
  );
}

// Main page component with Suspense boundary
const StudioPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1C1C1E] flex items-center justify-center">
        <Loader />
      </div>
    }>
      <StudioContent />
    </Suspense>
  );
};

export default StudioPage;