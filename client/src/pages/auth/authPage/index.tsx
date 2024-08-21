import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CardSpotlight } from "@/components/ui/cardSpotlight";

const AuthPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const isError = false;
  const isLoading = false;
  const error = "Invalid email or password";

  const { pathname } = useLocation();
  const path = pathname.split("/").pop();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("user", user);
  };

  return (
    <CardSpotlight className="bg-slate-500/20 backdrop-blur-lg text-black max-w-lg w-full !z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-xl flex items-center justify-center border border-white/20">
      <form onSubmit={handleSubmit} className="mx-auto grid w-full gap-6 z-10">
        <div className="absolute bg-sky-500 -top-20 -left-20 w-64 aspect-square rounded-full !-z-[50000] blur-xl opacity-80"></div>
        <div className="absolute bg-orange-500 -bottom-20 -right-20 w-64 aspect-square rounded-full !-z-[50000] blur-xl opacity-80"></div>

        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold text-white">
            {path === "register" ? "Register Yourself" : "Login"}
          </h1>
          <p className="text-balance text-muted">
            Enter your email below to{" "}
            {path === "register" ? "register" : "login"} to your account
          </p>
        </div>

        <div className="grid gap-5">
          {path === "register" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                name="name"
                disabled={isLoading}
                placeholder="Enter your name"
                required
                value={user.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              disabled={isLoading}
              placeholder="Enter your email"
              required
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              name="password"
              disabled={isLoading}
              required
              value={user.password}
              onChange={handleChange}
            />

            {path !== "register" && (
              <Link
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline text-white"
              >
                Forgot your password?
              </Link>
            )}
          </div>

          {isError && (
            <p className="text-red-500 text-sm -my-2 font-medium">{error}</p>
          )}

          <Button isLoading={isLoading} type="submit" className="w-full">
            {path === "register" ? "Register" : "Login"}
          </Button>

          <div className="flex items-center justify-center w-full overflow-hidden gap-5">
            <Separator />
            <span className="text-sm text-muted-foreground">OR</span>
            <Separator />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <img
              src="/icons/google.png"
              alt="google"
              className="w-5 aspect-square"
            />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="mt-1 text-center text-sm text-white">
          {path !== "register" ? "Don't" : "Already"} have an account?{" "}
          <Link
            to={`/auth/${path === "register" ? "login" : "register"}`}
            className="underline"
          >
            {path === "register" ? "Login" : "Register"}
          </Link>
        </div>
      </form>
    </CardSpotlight>
  );
};

export default AuthPage;
