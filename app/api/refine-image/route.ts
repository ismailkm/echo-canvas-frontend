import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.formData();

    const sessionId = requestData.get('sessionId');
    const imageUrl = requestData.get('imageUrl');
    const text_instruction = requestData.get('text_instruction');

    if (!sessionId) {
      return NextResponse.json({ message: 'sessionId is required' }, { status: 400 });
    }
    if (!imageUrl) {
        return NextResponse.json({ message: 'imageUrl is required' }, { status: 400 });
    }
    if (!text_instruction) {
      return NextResponse.json({ message: 'text_instruction is required' }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/refine-image`;

    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('imageUrl', imageUrl);
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
    console.error('Error in refine image API:', error);
    return NextResponse.json(
      { message: 'Failed to refine image' },
      { status: 500 }
    );
  }
}