import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { createRequire } from "module";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse/lib/pdf-parse.js");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No file uploaded." },
        { status: 400 }
      );
    }

    const fileName = file.name || "unknown-file";
    const fileSize = file.size || 0;
    const lowerName = fileName.toLowerCase();

    const maxSize = 5 * 1024 * 1024;

    if (fileSize > maxSize) {
      return NextResponse.json(
        { success: false, error: "File is too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";

    if (
      lowerName.endsWith(".txt") ||
      lowerName.endsWith(".md") ||
      lowerName.endsWith(".json")
    ) {
      extractedText = buffer.toString("utf-8");
    } else if (lowerName.endsWith(".pdf")) {
      const pdfData = await pdfParse(buffer);
      extractedText = pdfData.text || "";
    } else if (lowerName.endsWith(".docx")) {
      const docxData = await mammoth.extractRawText({ buffer });
      extractedText = docxData.value || "";
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Use .txt, .md, .json, .pdf, or .docx.",
        },
        { status: 400 }
      );
    }

    const cleanedText = extractedText.trim().slice(0, 8000);

    if (!cleanedText) {
      return NextResponse.json(
        { success: false, error: "No readable text found in this file." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName,
      characterCount: cleanedText.length,
      text: cleanedText,
    });
  } catch (error) {
    console.error("Extract reference error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to extract file text.",
      },
      { status: 500 }
    );
  }
}