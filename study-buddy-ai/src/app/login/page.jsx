"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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

const page = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login success");
      router.push(`/profile/${user.email}`)
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true)
    }
  }, [user])
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-sm relative z-10">
        <CardHeader>
          <CardTitle>
            {loading ? "Processing" : "Login to your account"}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgotpassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={user.password}
                  placeholder="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={onLogIn}>
            LogIn
          </Button>
        </CardFooter>
        <BorderBeam size={100} duration={8} className="rounded-xl" />
      </Card>
    </div>
  );
};

export default page;
