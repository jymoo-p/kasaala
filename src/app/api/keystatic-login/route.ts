import { NextRequest, NextResponse } from "next/server";

const AUTH_TOKEN = "kasaala_admin_ok";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.KEYSTATIC_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("ks_auth", AUTH_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
