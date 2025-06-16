"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { BorderBeam } from "@/components/magicui/border-beam";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';

const page = () => {
  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async() => {
    try {
      const response = await axios.post('/api/users/forgotpassword', {email});
      console.log("Email sent successfully!", response.data);
      toast.success("Mail sent successfully");
    } catch (error) {
      console.log("error: ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
      if (email.length > 0) {
        setButtonDisabled(false);
      }
      else{
        setButtonDisabled(true);
      }
  }, [email])
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-sm relative z-10">
        <CardHeader>
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription className='mt-2'>
            Enter your email below to reset the password
            <p>An email will be sent to you regarding reset password</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full"
          onClick={handleSubmit}
          disabled = {buttonDisabled}
          >
            {buttonDisabled ? "Enter email":"Send Mail"}
          </Button>
        </CardFooter>
        <BorderBeam size={100} duration={8} className="rounded-xl" />
      </Card>
    </div>
  );
}

export default page
