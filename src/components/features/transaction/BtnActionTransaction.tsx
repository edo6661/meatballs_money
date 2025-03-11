"use client"
import { Pathnames, useRouter } from '@/i18n/routing'
import { deleteTransaction } from '@/server/actions/transaction_action'
import { Pencil, Trash } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const BtnActionTransaction = ({
  id,
  isTable = false
}: {
  id: string,
  isTable?: boolean
}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    startTransition(async () => {
      await deleteTransaction(id);
      router.refresh();
    })
  };

  return (
    <div className='flex flex-wrap items-center gap-2'>




      {!isTable && <>
        <div
          onClick={() => {
            router.push({
              pathname: '/transactions/[transactionId]' as Pathnames,
              params: { transactionId: id }
            })
          }}
          className={`mr -4 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}

        >
          <Pencil />
        </div>
        <AlertDialog
          onOpenChange={setIsOpen}
          open={isOpen}
          defaultOpen={isOpen}

        >
          <AlertDialogTrigger>
            <Trash />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}

              >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>}

      {isTable && (
        <>
          <div
            onClick={() => {
              router.push({
                pathname: '/transactions/[transactionId]' as Pathnames,
                params: { transactionId: id }
              })
            }}
            className={`mr -4 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}

          >
            <Pencil />
          </div>
          <AlertDialog
            onOpenChange={setIsOpen}
            open={isOpen}
            defaultOpen={isOpen}

          >
            <AlertDialogTrigger>
              <Trash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}

                >Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}

export default BtnActionTransaction