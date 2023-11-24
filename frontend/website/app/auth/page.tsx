"use client";
import Link from "next/link";
import React from "react";
import {Button} from "@/components/ui/button";

type Props = {};
const AuthPage = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-3">
        <h5 className="sm:hidden">Trix Url</h5>
      </div>
      <div className="p-3 px-5 w-full flex-1 h-fullitems-center justify-center flex flex-col">
        <h1 className="text-3xl font-bold text-center my-5">Get Started</h1>
        <div className="container mx-auto flex gap-2 items-center justify-arround">
          <Link href={"/auth/login"} className="flex-1 flex">
            <Button className="flex-1 bg-black hover:bg-black/80 text-white  font-semibold">
              Log in
            </Button>
          </Link>
          <Link href={"/auth/register"} className="flex-1 flex">
            <Button className="flex-1 bg-black hover:bg-black/80 text-white font-semibold">
              Register
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex my-5 flex-col items-center">
        <h5 className="text-md font-bold">Trixify</h5>
        <p>Copyright &copy; {new Date().getFullYear()} <span className="font-bold"><Link target="_blank" href="https://github.com">Tomdieu</Link></span> </p>
      </div>
    </div>
  );
};

export default AuthPage;
