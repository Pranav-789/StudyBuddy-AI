"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { BorderBeam } from "@/components/magicui/border-beam";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [npassword, setNPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = async () => {
    if (npassword !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid or expired token");
      return;
    }

    try {
      await axios.post("/api/users/resetpassword", {
        token,
        password: npassword,
      });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error) {
      console.log("Reset failed: ", error.message);
      toast.error("Reset failed: " + error.message);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(npassword.length > 0 && cpassword.length > 0));
  }, [npassword, cpassword]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-sm relative z-10">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription className="mt-2">
            Enter new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={npassword}
                  onChange={(e) => setNPassword(e.target.value)}
                  placeholder="xyz@39087"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpassword">Confirm Password</Label>
                <Input
                  id="cpassword"
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="xyz@39087"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Enter Password" : "Change Password"}
          </Button>
        </CardFooter>
        <BorderBeam size={100} duration={8} className="rounded-xl" />
      </Card>
    </div>
  );
};

export default ResetPasswordClient;
