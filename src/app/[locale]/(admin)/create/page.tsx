import WithUser from '@/components/common/WithUser';
import FormUpsertTransaction from '@/components/features/transaction/FormUpsertTransaction';
import TemporaryLoading from '@/components/shared/TemporaryLoading';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Create Transaction",
  description: "Create Transaction",
}

const CreateTransactionPage = async () => {

  return <WithUser
    fallback={<TemporaryLoading
      text="Temporary loading form create transaction ..."
    />}
  >
    {(user) => (

      <FormUpsertTransaction user={user} />
    )}
  </WithUser>


}

export default CreateTransactionPage