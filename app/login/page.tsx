import LoginWrapper from "@/app/components/LoginWrapper";
import Logo from "@/app/components/Logo";
import { LoginForm } from "anjrot-components";
import React from "react";

const Login = () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-slate-700 p-3 md:h-36">
          <div className="w-32 text-white md:w-36 m-auto">
            <Logo />
          </div>
        </div>
        <LoginWrapper />
      </div>
    </main>
  );
};

export default Login;
