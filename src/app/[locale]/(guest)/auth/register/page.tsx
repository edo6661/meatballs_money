"use client"
import ErrorInputField from '@/components/shared/ErrorInputField'
import { Button } from '@/components/ui/button'
import { REGISTER } from '@/constants/il8n'
import { useRouter } from '@/i18n/routing'
import { register } from '@/server/actions/auth_action'
import createToast from '@/utils/create_toast'
import { Camera, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useActionState, useEffect } from 'react'

const RegisterPage = () => {
  const [state, signUp, isPending] = useActionState(register, {})
  const t = useTranslations(REGISTER);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      createToast({
        title: state.message,
      });
      router.push('/auth/login');
    }
  }, [state, router]);



  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col gap-4' action={signUp}>
        <Button
          onClick={() => {
            createToast({
              title: 'test',
              description: 'test desc',
              // leadingIcon: <Check size={20} />
            })
          }}
        >
          test
        </Button>

        <div>
          <label htmlFor="name">
            {t('name')}
          </label>
          <input type="text" name="name" id="name" />
          {state.formErrors?.name?.map((error) => (
            ErrorInputField({ error })
          ))
          }
        </div>
        <div>
          <label htmlFor="email">
            {t('email')}
          </label>
          <input type="email" name="email" id="email" />
          {state.formErrors?.email?.map((error) => (
            ErrorInputField({ error })
          ))
          }
        </div>
        <div>
          <label htmlFor="password">
            {t('password')}
          </label>
          <input type="password" name="password" id="password" />
          {state.formErrors?.password?.map((error) => (
            ErrorInputField({ error })
          ))
          }
        </div>
        <div>
          <label htmlFor="confirmPassword">
            {t('confirmPassword')}
          </label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
          {state.formErrors?.confirmPassword?.map((error) => (
            ErrorInputField({ error })
          ))
          }
        </div>
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