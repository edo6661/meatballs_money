import { GITHUB } from '@/constants/auth_contant'
import { signIn } from '@/lib/auth'
import { login } from '@/server/actions/auth_action'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col' action={async (formData: FormData) => {
        "use server";
        await login(formData)

      }}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button
          type='submit'
          className='bg-blue-500 px-4 py-2 rounded-xl'
        >
          Sign in
        </button>


      </form>
      <div>
        <button
          onClick={async () => {
            "use server"
            await signIn(GITHUB)
          }}
          className='bg-green-500 px-4 py-2 rounded-xl'
        >
          Sign in with GitHub
        </button>
        <button
          onClick={async () => {
            "use server"
            redirect('/auth/register')
          }}
          className='bg-yellow-500 px-4 py-2 rounded-xl'
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default LoginPage