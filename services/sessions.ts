import { Session } from '@/types/sessions';


export async function getSession(id: string): Promise<Session> {
  const response = await fetch(`/api/sessions/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const sessionData: Session = await response.json();
  return sessionData;
}