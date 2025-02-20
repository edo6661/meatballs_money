import WithUser from '@/components/common/WithUser';
import FormUpsertTransaction from '@/components/features/transaction/FormUpsertTransaction';
import React from 'react'

const CreateTransactionPage = async () => {

  return <WithUser
    fallback={<div>Loading form create transaction...</div>}
  >
    {(user) => (
      <FormUpsertTransaction user={user} />
    )}
  </WithUser>


}

export default CreateTransactionPage