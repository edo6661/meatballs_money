"use client"
import { Button } from '@/components/ui/button'
import { register } from '@/server/actions/auth_action'
import React, { useActionState } from 'react'

const RegisterPage = () => {
  const [state, signUp, isPending] = useActionState(register, {})

  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col' action={signUp}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        {state.formErrors?.name?.map((error) => (
          <p key={error} className='text-red-500'>
            {error}
          </p>
        ))
        }
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <Button
          disabled={isPending}
        >
          Register
        </Button>


      </form>
      <button

        className='bg-green-500 px-4 py-2 rounded-xl'
      >
        Login
      </button>
    </div>
  )
}

export default RegisterPage