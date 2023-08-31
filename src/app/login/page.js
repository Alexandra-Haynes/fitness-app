"use client";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get email and password from local storage
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password === "" || email === "") {
      setErrorMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
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
        setIsLoading(false);
        console.log("Error while logging...");
        setErrorMessage("Error occurred while logging. Please try again");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in catch block:", error);
      setErrorMessage("An unexpected error occurred");
    }
  };
  return (
    <>
      <section
        className="w-screen h-screen bg-hero2
    flex flex-col items-center justify-center bg-center bg-cover"
      >
        <div
          className="flex flex-col  w-2/3 md:w-1/2 px-8 py-8
           bg-white/80 max-w-[600px]
        rounded-md shadow-xl md:p-24"
        >
          <h1
            className="mb-4 w-full text-4xl font-light text-center 
          text-gray-800 uppercase "
          >
            Login
          </h1>

          <h2
            className="self-center text-xl font-light
           text-gray-600 "
          >
            Welcome Back!
          </h2>

          <form className="mt-8">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="rounded-lg border border-primary/50 w-full py-2 px-4
                     bg-white text-gray-700 mb-2
                     placeholder-gray-400 shadow-sm  focus:outline-none
                     focus:placeholder:invisible  
                     focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Email"
            />

            <input
              value={password}
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
              onClick={handleSubmit}
              className="py-2 px-4 hover:bg-primary hover:text-white bg-highlights
                    text-black w-full transition ease-in-out duration-200 
                    text-center shadow-md  rounded-lg hover:translate-y-1
                    flex flex-row gap-2 items-center justify-center"
            >
              {isLoading ? (
                <>
                  Login <LoadingSpinner />
                </>
              ) : (
                "Login"
              )}
            </button>
            {errorMessage && <ErrorMessage errorText={errorMessage} />}
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
    </>
  );
};

export default Login;
