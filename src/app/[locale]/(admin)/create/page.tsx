import WithUser from '@/components/common/WithUser';
import FormCreateTransaction from '@/components/features/transaction/FormCreateTransaction'
import React, { Suspense } from 'react'

const CreateTransactionPage = async () => {

  return <Suspense fallback={<div>Loading User to form create transactions...</div>}>
    <WithUser>
      {(user) => (
        <FormCreateTransaction user={user} />
      )}
    </WithUser>
  </Suspense>


}

export default CreateTransactionPage