import { NextResponse } from "next/server";
import axios from "axios";
import { summarizeText } from "@/lib/gemini";
import { extractTextFromBuffer } from "@/lib/extractTextFromBuffer";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import Summary from "@/models/summaryModel";

export async function POST(req) {
  try {
    const { fileUrl, fileName, fileType } = await req.json();

    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Username: ", decodedToken.username);
    console.log("userID: ", decodedToken.id);
    console.log("email: ", decodedToken.email);

    console.log("Incoming Summarize Request:");
    console.log("fileUrl:", fileUrl);
    console.log("fileName:", fileName);
    console.log("fileType:", fileType);

    const fileRes = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const fileBuffer = Buffer.from(fileRes.data);
    console.log("Downloaded buffer length:", fileBuffer.length);

    const text = await extractTextFromBuffer(fileBuffer, fileType);
    const summary = await summarizeText(text);
    console.log(summary);

    const summaryOnDB = new Summary({
      userId: decodedToken.id,
      extractedText: text,
      summary: summary,
      title: fileName
    });

    const savedSummary = await summaryOnDB.save();
    console.log(savedSummary)

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Summarization failed" },
      { status: 500 }
    );
  }
}
