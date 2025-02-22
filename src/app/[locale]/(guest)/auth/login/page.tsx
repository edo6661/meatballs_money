"use client"
import ErrorInputField from '@/components/shared/ErrorInputField'
import { Button } from '@/components/ui/button'
import { LOGIN } from '@/constants/il8n'
import { useRouter } from '@/i18n/routing'
import { login } from '@/server/actions/auth_action'
import createToast from '@/utils/create_toast'
import { useTranslations } from 'next-intl'
import React, { useActionState, useEffect } from 'react'

const LoginPage = () => {
  const [state, signIn, isPending] = useActionState(login, {})
  const t = useTranslations(LOGIN);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      createToast({
        title: state.message,
      });
      router.replace('/');
      router.refresh();
    }
  }, [state, router]);



  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col gap-4' action={signIn}>



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
          router.push('/auth/register');
        }}

      >
        {t('register')}
      </Button>
    </div >
  )
}

export default LoginPage