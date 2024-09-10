import { NextResponse } from "next/server";

export async function GET() {
  const fakeData = {
    item1: "1",
  };

  return NextResponse.json(fakeData);
}
