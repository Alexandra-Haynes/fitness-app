"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === "" || email === "") {
      toast.error("Fill all fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("Error occured while logging");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <section
        className="w-screen h-screen bg-hero2
    flex flex-col items-center justify-center bg-center bg-cover"
      >
        <div
          className="flex flex-col  w-2/3 md:w-1/2 px-4 py-8
           bg-white/80 
        rounded-md shadow-xl md:p-24"
        >
          <h1
            className="mb-4 w-full text-4xl font-light text-center 
          text-gray-800 uppercase "
          >
            Login
          </h1>

          <h2 className="self-center text-xl font-light
           text-gray-600 ">
            Welcome Back!
          </h2>
         
            <form onSubmit={handleSubmit} className="mt-8">
              
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="rounded-lg border border-primary/50 w-full py-2 px-4
                     bg-white text-gray-700
                     placeholder-gray-400 shadow-sm  focus:outline-none
                     focus:placeholder:invisible  
                     focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Email"
                />
              

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="sign-in-email"
                className="w-full rounded-lg border border-primary/50 py-2 px-4 mb-4 
                    bg-white text-gray-700 placeholder-gray-400 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-secondary 
                    focus:placeholder:invisible  focus:border-transparent"
                placeholder="Password"
              />

              <button
                type="submit"
                className="py-2 px-4 hover:bg-primary hover:text-white bg-highlights
                    text-black w-full transition ease-in-out duration-200 
                    text-center shadow-md  rounded-lg hover:translate-y-1"
              >
                Login
              </button>
            </form>
         
          <div className="flex items-center justify-center mt-6">
            <a
              href="/register"
              target="_blank"
              className="text-xs 
              font-thin text-center text-gray-500 hover:text-gray-700 hover:underline"
            >
              Need An Account?
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
