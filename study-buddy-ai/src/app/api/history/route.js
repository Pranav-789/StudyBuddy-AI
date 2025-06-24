import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Summary from "@/models/summaryModel";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
connect();

export async function GET(){
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const summaries = await Summary.find({ userId: decodedToken.id })
      .select("_id title")
      .sort({ createdAt: -1 });
    return NextResponse.json({success: true, summaries});
}