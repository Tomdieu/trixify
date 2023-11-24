import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Trixify | Auth",
  description: "Authenticate",
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="container w-screen h-screen flex overflow-x-hidden">
      <div className="hidden sm:w-5/12 md:w-7/12  sm:flex flex-col h-full container mx-auto">
        <div className="my-2">
          <h5 className="text-2xl font-bold cursor-pointer select-none">

            <Link className="flex gap-1 items-center" href={"/"}>
              <Image src={"/favicon.svg"} className="drop-shadow-sm" width={40} height={40} alt="Trixify" />
              <span className="text-4xl text-shadow-lg">Trixify</span>
            </Link>

          </h5>
        </div>
        <div className="select-none flex-1 flex items-center justify-center h-full  gap-3 flex-col">

          <Image src={"/favicon.svg"} className={"drop-shadow-2xl cursor-pointer"} width={250} height={250} alt="Trixify" />
          {/* <h1 className="sm:text-4xl md:text-5xl lg:text-7xl font-bold flex-wrap">
            Trixify
          </h1> */}
          <h4 className="text-xl font-bold text-gray-500">Connect with friends and the world around you on Trixify</h4>

        </div>
      </div>
      <div className="flex-1 sm:w-7/12 md:w-5/12  h-full bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
