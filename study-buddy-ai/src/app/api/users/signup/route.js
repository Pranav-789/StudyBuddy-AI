import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);//remove on deploy
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exist"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email, 
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "Created user successfully",
            success: true,
            savedUser
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}