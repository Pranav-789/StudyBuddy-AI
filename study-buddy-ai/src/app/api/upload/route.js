import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get("file");

        if (!file) {
          return NextResponse.json(
            {
              success: false,
              error: "No file uploaded",
            },
            { status: 400 }
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes).toString('base64')
        console.log("Buffer length: ", buffer.length);
        const fileName = file.name || "upload";
        const [nameWithoutExt, ext] = fileName.split(/\.(?=[^\.]+$)/);
        const fileType = file.name.split(".").pop();

        // const res = await fetch('')
        
        
        return NextResponse.json({
          success: true,
          buffer: buffer.toString("base64"),
          fileName,
          fileType
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Something went wrong during file upload",
          },
          { status: 500 }
        );
    }
}
