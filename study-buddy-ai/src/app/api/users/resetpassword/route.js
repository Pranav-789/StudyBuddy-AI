import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {token, password} = reqBody;
        console.log(token);

        const user = await User.findOne({
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: {$gt: Date.now()},
        });

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword;
        await user.save();

        console.log(user);
        return NextResponse.json({message: "Password reset successful", success: true});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}