import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody); //remove on deploy
        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json(
            { error: "User doesn't exist" },
            { status: 400 }
          );
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json(
              { error: "Invalid password!" },
              { status: 400 }
            );
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        return NextResponse.json({error: "Error connecting to DB"}, {status: 500})
    }
}


connect();