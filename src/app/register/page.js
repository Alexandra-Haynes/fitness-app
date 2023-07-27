"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      toast.error("Fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      console.log(await res.json());
      if (res.ok) {
        toast.success("Successfully registered the user");
        console.log('Successfully resgistered!')
        setTimeout(() => {
          signIn();
        }, 1500);
        return;
      } else {
        toast.error("Error occured while registering");
        console.log('Error while registering...')
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section
        className="h-screen bg-hero3 w-screen 
    bg-top bg-cover flex flex-col items-center justify-center"
      >
        <div
          className="flex flex-col w-2/3 md:w-1/2 px-4 py-8 bg-white/80 rounded-md 
      shadow-xl md:p-24 max-w-[600px]"
        >
          <h1 className="mb-4 w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl">
            Sign Up
          </h1>

          <h2 className="self-center text-xl font-light text-gray-600 ">
            Join us!
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-center justify-center gap-3"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="rounded-lg border border-primary/50 w-full py-2 px-4
                     bg-white text-gray-700
                     placeholder-gray-400 shadow-sm  focus:outline-none
                     focus:placeholder:invisible  
                     focus:ring-2 focus:ring-secondary focus:border-transparent"
            />

            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="rounded-lg border border-primary/50 w-full py-2 px-4
                     bg-white text-gray-700
                     placeholder-gray-400 shadow-sm  focus:outline-none
                     focus:placeholder:invisible  
                     focus:ring-2 focus:ring-secondary focus:border-transparent"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
             
              placeholder="Password"
              className="rounded-lg border border-primary/50 w-full py-2 px-4
                     bg-white text-gray-700
                     placeholder-gray-400 shadow-sm  focus:outline-none
                     focus:placeholder:invisible  
                     focus:ring-2 focus:ring-secondary focus:border-transparent"
            />

            <button
          onClick={handleSubmit}
              className="py-2 px-4 hover:bg-primary hover:text-white bg-highlights
                    text-black w-full transition ease-in-out duration-200 
                    text-center shadow-md  rounded-lg hover:translate-y-1"
            >
              Register
            </button>
          </form>

          <div className="flex items-center justify-center mt-6">
            <a
              href="/login"
              target="_blank"
              className=" text-xs font-thin text-center text-gray-500
             hover:text-gray-700 hover:underline"
            >
              Already have an account?
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
