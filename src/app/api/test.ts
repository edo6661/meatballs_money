import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      message: "Hello from the API",
    });
  } catch (error) {
    console.error("test:", error);
    return NextResponse.json({ error: "test" }, { status: 500 });
  }
}
