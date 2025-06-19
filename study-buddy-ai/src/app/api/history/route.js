import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import Summary from "@/models/summaryModel";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const summaries = await Summary.find({userId: decodedToken.id}).select('_id title');
    return NextResponse.json({success: true, summaries});
}