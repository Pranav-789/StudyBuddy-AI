import { NextResponse } from "next/server";
import { summarizeText } from "@/lib/gemini";
import { getDataFromPDF } from "@/helpers/getdataformpdf";

export async function POST(req) {
  try {
    const { fileBuffer } = await req.json();

    console.log("Incoming Summarize Request:");

    const buffer = Buffer.from(fileBuffer, "base64");
    console.log("buffer length: ", buffer.length)

    const text = await getDataFromPDF(buffer);
    const summary = await summarizeText(text);
    console.log(summary);

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Summarization failed" },
      { status: 500 }
    );
  }
}
