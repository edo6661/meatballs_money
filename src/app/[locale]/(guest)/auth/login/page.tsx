import LoginForm from "@/components/features/auth/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page',

}

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage