import { Metadata } from 'next'
import React from 'react'
import RegisterForm from "@/components/auth/RegisterForm";

type Props = {}

export const metadata: Metadata = {
  title: 'Trixify | Register',
  description: 'Authenticate',

}
const RegisterPage = (props: Props) => {
  return (
    <React.Fragment>
      <RegisterForm />
    </React.Fragment>
  )
}

export default RegisterPage