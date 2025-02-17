"use client"
import ErrorInputField from '@/components/shared/ErrorInputField'
import { Button } from '@/components/ui/button'
import { TRANSACTION_FIELDS } from '@/constants/il8n'
import { useRouter } from '@/i18n/routing'
import { createTransaction } from '@/server/actions/transaction_action'
import createToast from '@/utils/create_toast'
import { useTranslations } from 'next-intl'
import React, { useActionState, useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'

const FormCreateTransaction = (
  { userId }: { userId: string }
) => {


  const [state, create, isPending] = useActionState(createTransaction, {})
  const t = useTranslations(TRANSACTION_FIELDS);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      createToast({
        title: state.message,
      });
      router.push('/');
    }
  }, [state, router]);

  const [descriptions, setDescriptions] = useState([""]);
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const removeDescription = (index: number) => {
    if (descriptions.length > 1) {
      setDescriptions(descriptions.filter((_: string, idx: number) => idx !== index));
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };




  return (
    <div className='container flex flex-col gap-12'>
      <form className='flex flex-col gap-4' action={create}>
        <input type="hidden" name="userId" value={userId} />
        {state.formErrors?.userId?.map((error) => (
          <ErrorInputField
            error={error}
            key={error}
          />
        ))
        }

        <div>

          <label htmlFor="type">
            {t('type')}
          </label>
          <select name="type" id="type">
            <option value="INCOME">
              {t('income')}
            </option>
            <option value="EXPENSE">
              {t('expense')}
            </option>
          </select>
          {state.formErrors?.type?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div>
          <label htmlFor="amount">
            {t('amount')}
          </label>
          <input type="number" name="amount" id="amount" required />
          {state.formErrors?.amount?.map((error) => (
            <ErrorInputField
              error={error}
              key={error}
            />
          ))
          }
        </div>
        <div>
          <label htmlFor="category">
            {t('category')}
          </label>
          <input type="text" name="category" id="category" />
        </div>

        <div>
          <label>{t('transactionDate')}</label>

          <input
            type="hidden"
            name="transactionDate"
            value={transactionDate?.toISOString()}
          />

          <Calendar
            mode="single"
            selected={transactionDate}
            onSelect={(date) => setTransactionDate(date!)}
            className="rounded-md border"
          />

          {state.formErrors?.transactionDate?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <div>
          <label>{t('description')}</label>
          {descriptions.map((desc, index) => (
            <div key={index} className="flex items-center gap-2">
              {/* Pastikan nama input sama agar FormData.getAll("description") bisa mengumpulkan semuanya */}
              <input
                type="text"
                name="description"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
              />
              {descriptions.length > 1 && (
                <Button type="button" onClick={() => removeDescription(index)}>
                  –
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addDescription}>
            +
          </Button>
          {state.formErrors?.description?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <Button
          disabled={isPending}
        >
          {t('submit')}
        </Button>


      </form >

    </div >
  )
}

export default FormCreateTransaction