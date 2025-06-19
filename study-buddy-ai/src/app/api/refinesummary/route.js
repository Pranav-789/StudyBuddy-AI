import Summary from "@/models/summaryModel";
import { NextResponse } from "next/server";
import { refineSummary } from "@/lib/gemini";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function POST(req){
    try {
        const { summaryId, promptExtension } = await req.json();

        if(!summaryId){
            return NextResponse.json({success: false, error: "Summary Id not found"});
        }

        const oldSummary = await Summary.findOne({_id: summaryId});
        const oldSummarytext = oldSummary.summary;

        const newSummary = await refineSummary(oldSummarytext, promptExtension);

        const updateSummary = await Summary.findOneAndUpdate({_id: summaryId}, {summary: newSummary});
        console.log(updateSummary);

        return NextResponse.json({success: true, newSummary});

    } catch (error) {
        console.error(error);
        return NextResponse.json(
          { success: false, error: "Summary refinement failed" },
          { status: 500 }
        );
    }
}