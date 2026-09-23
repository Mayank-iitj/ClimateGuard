import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Simulate network delay to make the loading state visible
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulated successful response
    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been received.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
