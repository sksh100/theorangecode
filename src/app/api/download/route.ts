// app/api/download/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import { verifyDownloadToken } from "@/lib/downloadToken";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const ebook = searchParams.get("ebook") || "uk-to-uae"; // Default to UK guide

  if (!token) {
    return new NextResponse("Missing token", { status: 400 });
  }

  const payload = await verifyDownloadToken(token);

  if (!payload || typeof payload.email !== "string") {
    return new NextResponse("Invalid or expired token", { status: 401 });
  }

  const email = payload.email;

  try {
    // Determine which PDF to use based on ebook parameter
    let pdfPath: string;
    let fileName: string;
    
    if (ebook === "beyond-formalities") {
      pdfPath = path.join(process.cwd(), "protected", "beyond-formalities-flattened.pdf");
      fileName = "Beyond-Formalities-by-Dr-Marwan-Al-Zarka.pdf";
    } else {
      pdfPath = path.join(process.cwd(), "protected", "uk-uae-guide-flattened.pdf");
      fileName = "UK-to-UAE-Cultural-Intelligence-Guide.pdf";
    }

    // 1. Read the base flattened PDF (protected, not public)
    const basePdfBytes = await fs.readFile(/*turbopackIgnore: true*/ pdfPath);

    // 2. Load PDF and font
    const pdfDoc = await PDFDocument.load(basePdfBytes);

    const fontPath = path.join(process.cwd(), "fonts", "Lato-Regular.ttf");
    const latoFontBytes = await fs.readFile(fontPath);
    const latoFont = await pdfDoc.embedFont(latoFontBytes);

    const pages = pdfDoc.getPages();
    const text = `Purchased by: ${email}`;
    const fontSize = 14;

    // 15% opacity like a watermark
    const opacity = 0.15;
    const color = rgb(0.25, 0.25, 0.25); // dark grey; opacity will soften it

    pages.forEach((page) => {
      const { width } = page.getSize();
      const textWidth = latoFont.widthOfTextAtSize(text, fontSize);
      const x = (width - textWidth) / 2;    // centered
      const y = 20;                         // 20 points from bottom

      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font: latoFont,
        color,
        opacity,
      });
    });

    const stampedPdfBytes = await pdfDoc.save();

    // 3. Return as downloadable file
    return new NextResponse(Buffer.from(stampedPdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error("Error generating stamped PDF", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
