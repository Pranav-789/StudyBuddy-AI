import Summary from "@/models/summaryModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const summaryId = searchParams.get("summaryId");

        const summaryDoc = await Summary.findOne({ _id: summaryId });
        if(!summaryDoc){
            return NextResponse.json({success: false, error: "Summary not found"}, {status: 404});
        }
        return NextResponse.json({
          success: true,
          summary: summaryDoc.summary,
          id: summaryDoc._id,
        });
    } catch (error) {
        return NextResponse.json({success: false, error: "Internal server"}, {status: 500});
    }
}