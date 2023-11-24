import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: 'Trixify | Login',
  description: 'Authenticate',

}
const LoginPage = (props: Props) => {

  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  )
};

export default LoginPage;
