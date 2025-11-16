import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest
) {
  const body = await request.json();
  const { id } = body;

  const externalApiUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/sessions/${id}`;

  try {
    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      // If the external API returns an error, propagate it
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const sessionData = await response.json();
    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error fetching session from external API:', error);
    return NextResponse.json(
      { message: 'Failed to fetch session data' },
      { status: 500 }
    );
  }
}