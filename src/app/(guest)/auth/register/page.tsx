import { register } from '@/server/actions/auth_action'
import { redirect } from 'next/navigation'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col' action={register}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button
          type='submit'
          className='bg-blue-500 px-4 py-2 rounded-xl'
        >
          Sign Up
        </button>


      </form>
      <button
        onClick={async () => {
          "use server"
          redirect('/auth/login')
        }}
        className='bg-green-500 px-4 py-2 rounded-xl'
      >
        Login
      </button>
    </div>
  )
}

export default RegisterPage