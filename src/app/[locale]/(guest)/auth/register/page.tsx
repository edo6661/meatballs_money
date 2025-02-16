"use client"
import ErrorInputField from '@/components/shared/ErrorInputField'
import { Button } from '@/components/ui/button'
import { REGISTER } from '@/constants/il8n'
import { useRouter } from '@/i18n/routing'
import { register } from '@/server/actions/auth_action'
import createToast from '@/utils/create_toast'
import { useTranslations } from 'next-intl'
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


        <div>
          <label htmlFor="name">
            {t('name')}
          </label>
          <input type="text" name="name" id="name" />
          {state.formErrors?.name?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div>
          <label htmlFor="email">
            {t('email')}
          </label>
          <input type="email" name="email" id="email" />
          {state.formErrors?.email?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div>
          <label htmlFor="password">
            {t('password')}
          </label>
          <input type="password" name="password" id="password" />
          {state.formErrors?.password?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div>
          <label htmlFor="confirmPassword">
            {t('confirmPassword')}
          </label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
          {state.formErrors?.confirmPassword?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <Button
          disabled={isPending}
        >
          {t('submit')}
        </Button>


      </form >
      <Button
        variant={'outline'}
        disabled={isPending}
        onClick={() => {
          router.push('/auth/login');
        }}

      >
        {t('login')}
      </Button>
    </div >
  )
}

export default RegisterPage