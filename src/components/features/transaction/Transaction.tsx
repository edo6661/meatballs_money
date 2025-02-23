import WithUser from '@/components/common/WithUser'
import React from 'react'
import FormUpsertTransaction from './FormUpsertTransaction'
import { getTransactionById } from '@/server/queries/transactions_query'

const Transaction = async (
  { transactionId }: { transactionId: string }
) => {
  const result = await getTransactionById(transactionId)
  if (!result.success) {
    return <div>Failed to load transaction</div>
  }
  if (!result.data) {
    return <div>Transaction not found</div>
  }


  return (
    <WithUser
      fallback={<div>Loading form update transaction...</div>}
    >
      {(user) => (
        <FormUpsertTransaction user={user} transaction={result.data!} />
      )}
    </WithUser>
  )
}

export default Transaction