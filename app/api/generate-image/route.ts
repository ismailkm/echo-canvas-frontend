import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    const requestData = await request.formData();
    const text_prompt = requestData.get('text_prompt');
    const audio_file = requestData.get('audio_file');

    const formData = new FormData();

    if (audio_file) {
      formData.append('audio_file', audio_file);
    } else if (text_prompt) {
      formData.append('text_prompt', text_prompt);
    } else {
      return NextResponse.json({ message: 'Either text_prompt or audio_file is required' }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/generate-image`;
    
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
    console.error('Error in image generation API:', error);
    return NextResponse.json(
      { message: 'Failed to generate image' },
      { status: 500 }
    );
  }
}