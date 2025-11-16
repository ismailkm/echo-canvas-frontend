import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.formData();

    const sessionId = requestData.get('sessionId');
    const text_instruction = requestData.get('text_instruction');

    if (!sessionId) {
      return NextResponse.json({ message: 'sessionId is required' }, { status: 400 });
    }
    if (!text_instruction) {
      return NextResponse.json({ message: 'text_instruction is required' }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/update-image`;

    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('text_instruction', text_instruction);

    const response = await fetch(externalApiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error in image update API:', error);
    return NextResponse.json(
      { message: 'Failed to update image' },
      { status: 500 }
    );
  }
}