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
import { TRANSACTION_PAGE } from '@/constants/il8n';
import { getTranslations } from 'next-intl/server';

const TransactionTableItem = async ({ transactions }: { transactions: Transaction[] }) => {
  const t = await getTranslations(TRANSACTION_PAGE);

  const getTypeStyle = (type: TransactionType) => {
    return type === TransactionType.INCOME
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <Table
    >
      <TableCaption className='mb-8'>{t("listTransactions")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead
            className='min-w-28'
          >{t("date")}</TableHead>
          <TableHead>{t("type")}</TableHead>
          <TableHead>{t("category")}</TableHead>
          <TableHead>{t("descriptions")}</TableHead>
          <TableHead className="text-right">{t("amount")}</TableHead>
          <TableHead>{t("actionTable")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium min-w-28"
            >
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
      </TableFooter>
    </Table>
  );
};

export default TransactionTableItem;
