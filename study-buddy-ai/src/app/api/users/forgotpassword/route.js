import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import {sendEmail} from "@/helpers/mailer"
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const userId = user._id;
    const mailresponse = await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json({
      message: "Reset password email sent",
      success: true,
      mailresponse,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  