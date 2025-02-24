import React from 'react'
import BtnActionTransaction from "./BtnActionTransaction";
import { format } from "date-fns";
import { formatTransactionType } from "@/utils/format_transaction";
import { formatRupiah } from "@/utils/format_currency";
import { Transaction, TransactionType } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TransactionTableItem = ({ transactions }: { transactions: Transaction[] }) => {

  const getTypeStyle = (type: TransactionType) => {
    return type === TransactionType.INCOME
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <Table>
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {format(new Date(transaction.transactionDate), "dd MMM yyyy")}
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeStyle(transaction.type)}`}>
                {formatTransactionType(transaction.type)}
              </span>
            </TableCell>
            <TableCell>{transaction.category || '-'}</TableCell>
            <TableCell>
              {transaction.description && transaction.description.length > 0 && transaction.description[0] !== ""
                ? transaction.description.join(", ")
                : "-"}
            </TableCell>
            <TableCell className="text-right">
              {formatRupiah(Number(transaction.amount))}
            </TableCell>
            <TableCell>
              <BtnActionTransaction
                id={transaction.id}
                isTable={true}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* Jika diperlukan, tambahkan footer */}
      </TableFooter>
    </Table>
  );
};

export default TransactionTableItem;
