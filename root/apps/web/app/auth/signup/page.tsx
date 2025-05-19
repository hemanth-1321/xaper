"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios"
import {toast} from "sonner"
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/config";


export default function Page() {
 const router=useRouter()
 const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setSuccess("Account created successfully!");
      toast.success("Account created successfully!");
      router.push("/")
      console.log("Server response:", response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      
      {/* Left Section */}
      <div className="hidden sm:flex w-1/2 bg-gradient-to-br from-orange-50 to-orange-100 p-16 flex-col justify-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Automate Your{" "}
          <span className="text-orange-500">GitHub</span> &{" "}
          <span className="text-orange-500">Email</span> Workflow
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed max-w-lg">
          Xaper helps you stay on top of issues, pull requests, and emails — no context switching, no wasted time. Save hours every week with intelligent automation.
        </p>
      </div>

      <div className="w-full sm:w-1/2 bg-white flex items-center justify-center p-6 min-h-screen">
  <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
    <CardHeader>
      <CardTitle className="text-center text-2xl font-semibold">
        Create your Xaper account
      </CardTitle>
    </CardHeader>
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit}>
  <Input
    name="fullName"
    placeholder="Full name"
    value={formData.fullName}
    onChange={handleChange}
  />
  <Input
    name="email"
    type="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
  />
  <Input
    name="password"
    type="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
  />


  <Button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white"
  >
    {loading ? "Creating..." : "Create Account"}
  </Button>
</form>
   <div className="flex items-center my-2">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

       

        <p className="text-sm text-center mt-4 text-gray-600">
          Do not have an account?{" "}
          <a href="/auth/login" className="text-orange-500 hover:underline font-medium">
            login
          </a>
        </p>
    </CardContent>
  </Card>
</div>

    </div>
  );
}
