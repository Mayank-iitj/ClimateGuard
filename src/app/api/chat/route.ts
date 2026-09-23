import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-5-nano'),
      system: `You are ClimateGuard AI, an expert climate risk consultant for Satin Finserv MSME clients.
      Your goal is to help MSMEs understand their climate exposure (like extreme heat, floods, or water stress)
      and recommend resilience actions like Thermal Optimization or Solar PV Backup.
      Always be professional, concise, and frame solutions as opportunities for 'sustainable MSME financing tiers'.`,
      messages,
    });



    if ((result as any).toDataStreamResponse) {
      return (result as any).toDataStreamResponse();
    } else if ((result as any).toAIStreamResponse) {
      return (result as any).toAIStreamResponse();
    } else if ((result as any).toTextStreamResponse) {
      return (result as any).toTextStreamResponse();
    } else {
      // Fallback
      return new Response(result.textStream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request', details: error?.message || String(error) }), { status: 500 });
  }
}
