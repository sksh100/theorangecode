// lib/downloadToken.ts

import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.DOWNLOAD_TOKEN_SECRET);

export async function createDownloadToken(email: string) {
  // Token valid for 48 hours – adjust if you want
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("48h")
    .sign(secret);

  return token;
}

export async function verifyDownloadToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string; exp: number; iat: number };
  } catch (err) {
    console.error("Invalid or expired download token", err);
    return null;
  }
}

