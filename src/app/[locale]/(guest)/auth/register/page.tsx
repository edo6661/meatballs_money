import RegisterForm from '@/components/features/auth/RegisterForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register page',
}

const RegisterPage = () => {
  return <RegisterForm />
}

export default RegisterPage