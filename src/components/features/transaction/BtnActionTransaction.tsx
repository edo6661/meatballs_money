"use client"
import { Button } from '@/components/ui/button'
import { Pathnames, useRouter } from '@/i18n/routing'
import { deleteTransaction } from '@/server/actions/transaction_action'
import React, { useTransition } from 'react'

const BtnActionTransaction = ({
  id
}: {
  id: string
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      await deleteTransaction(id);
      router.refresh();
    })
  };

  return (
    <div>
      <Button
        onClick={() => {
          router.push({
            pathname: '/transactions/[transactionId]' as Pathnames,
            params: { transactionId: id }
          })
        }}
        disabled={isPending}
      >
        Detail
      </Button>
      <Button
        onClick={handleDelete}
        disabled={isPending}
        variant="destructive"
      >
        Delete
      </Button>
    </div>
  )
}

export default BtnActionTransaction