"use client"
import ErrorInputField from '@/components/shared/ErrorInputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { REGISTER } from '@/constants/il8n'
import { useRouter } from '@/i18n/routing'
import { register } from '@/server/actions/auth_action'
import createToast from '@/utils/create_toast'
import { useTranslations } from 'next-intl'
import React, { useActionState, useEffect } from 'react'

const RegisterForm = () => {
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
    <div className='container flex flex-col gap-12 max-w-xl'>
      <form className='flex flex-col gap-4' action={signUp}>


        <div className="space-y-2">
          <Label htmlFor="name">
            {t('name')}
          </Label>
          <Input type="text" name="name" id="name" />
          {state.formErrors?.name?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            {t('email')}
          </Label>
          <Input type="email" name="email" id="email" />
          {state.formErrors?.email?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">
            {t('password')}
          </Label>
          <Input type="password" name="password" id="password" />
          {state.formErrors?.password?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            {t('confirmPassword')}
          </Label>
          <Input type="password" name="confirmPassword" id="confirmPassword" />
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

export default RegisterForm