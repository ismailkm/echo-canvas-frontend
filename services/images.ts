import { Session } from '@/types/sessions';

export async function generateImage(input: { text_prompt?: string; audioBlob?: Blob }): Promise<Session> {
  const formData = new FormData();

  if (input.audioBlob) {
    formData.append('audio_file', input.audioBlob, 'audio.webm');
  } else if (input.text_prompt) {
    formData.append('text_prompt', input.text_prompt);
  } else {
    throw new Error('Either text_prompt or audioBlob must be provided');
  }

  const response = await fetch('/api/generate-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to generate image');
  }
  
  const sessionData: Session = await response.json();

  return sessionData;

}

export async function describeImage(imageUrl: string): Promise<{ description: string }> {
  const response = await fetch('/api/describe-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to describe image');
  }

  const data = await response.json();
  return data;
}

export async function updateImage(sessionId: string, input: { text_instruction?: string; audioBlob?: Blob }): Promise<Session> {
  const formData = new FormData();
  formData.append('sessionId', sessionId);

  if (input.audioBlob) {
    formData.append('audio_file', input.audioBlob, 'audio.webm');
  } else if (input.text_instruction) {
    formData.append('text_instruction', input.text_instruction);
  } else {
    throw new Error('Either text_instruction or audioBlob must be provided');
  }

  const response = await fetch('/api/update-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reimagine image');
  }

  const sessionData: Session = await response.json();

  return sessionData;
}

export async function refineImage(sessionId: string, imageUrl: string, input: { text_instruction?: string; audioBlob?: Blob }): Promise<Session> {
  const formData = new FormData();
  formData.append('sessionId', sessionId);
  formData.append('imageUrl', imageUrl);

  if (input.audioBlob) {
    formData.append('audio_file', input.audioBlob, 'audio.webm');
  } else if (input.text_instruction) {
    formData.append('text_instruction', input.text_instruction);
  } else {
    throw new Error('Either text_instruction or audioBlob must be provided');
  }

  const response = await fetch('/api/refine-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to refine image');
  }

  const sessionData: Session = await response.json();

  return sessionData;
}