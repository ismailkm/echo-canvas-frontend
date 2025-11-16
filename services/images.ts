import { Session } from '@/types/sessions';

export async function generateImage(text_prompt: string):  Promise<Session> {
  const formData = new FormData();
  formData.append('text_prompt', text_prompt);

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

export async function updateImage(sessionId: string, text_instruction: string): Promise<Session> {
  const formData = new FormData();
  formData.append('sessionId', sessionId);
  formData.append('text_instruction', text_instruction);

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

export async function refineImage(sessionId: string, imageUrl: string, text_instruction: string): Promise<Session> {
  const formData = new FormData();
  formData.append('sessionId', sessionId);
  formData.append('imageUrl', imageUrl);
  formData.append('text_instruction', text_instruction);

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