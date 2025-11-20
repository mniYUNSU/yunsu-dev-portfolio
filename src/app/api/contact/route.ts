import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: Request) {
  const body = await request.json();

  // Simple honeypot/spam check
  if (body.honeypot) {
    return NextResponse.json(
      { success: false, message: "Spam detected." },
      { status: 400 },
    );
  }

  await delay(800);

  return NextResponse.json(
    {
      success: true,
      message: "Message received.",
    },
    { status: 200 },
  );
}
