import { create } from 'zustand';

interface AudioState {
  audioBlob: Blob | null;
  setAudioBlob: (blob: Blob | null) => void;
  clearAudioBlob: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  audioBlob: null,
  setAudioBlob: (blob) => set({ audioBlob: blob }),
  clearAudioBlob: () => set({ audioBlob: null }),
}));