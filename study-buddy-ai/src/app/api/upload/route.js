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
        const buffer = Buffer.from(bytes);
        console.log("Buffer length: ", buffer.length);
        const fileName = file.name || "upload";
        const [nameWithoutExt, ext] = fileName.split(/\.(?=[^\.]+$)/);
        
        if (ext && ext.toLowerCase() === "pdf") {
          return NextResponse.json({
            success: true,
            buffer: buffer.toString("base64"),
            fileName,
            ext,
          });
        }

        const uploadResult = await new Promise((resolve, reject)=>{
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: "raw",
                  folder: "summarizerAI",
                  public_id: `${nameWithoutExt}.${ext}`,
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              )
              .end(buffer);
        })
        return NextResponse.json({
            success: true,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            original_filename: uploadResult.original_filename,
        })
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
