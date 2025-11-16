import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {

    const requestData = await request.formData();
    const text_prompt = requestData.get('text_prompt');

    if (!text_prompt) {
      return NextResponse.json({ message: 'text_prompt is required' }, { status: 400 });
    }

    const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/generate-image`;

    const formData = new FormData();
    formData.append('text_prompt', text_prompt);

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