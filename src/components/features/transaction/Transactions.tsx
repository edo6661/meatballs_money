import { getTransactions } from "@/server/queries/transactions_query";
import React from "react";
import BtnActionTransaction from "./BtnActionTransaction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Transaction, TransactionType } from "@prisma/client";
import { formatTransactionType } from "@/utils/format_transaction";
import { formatRupiah } from "@/utils/format_currency";
import FilterTransactions from "./FilterTransactions";



const getTypeStyle = (type: TransactionType) => {
  return type === TransactionType.INCOME
    ? "bg-green-100 text-green-800 border-green-300"
    : "bg-red-100 text-red-800 border-red-300";
};
const getBorderBasedOnType = (type: TransactionType) => {
  return type === TransactionType.INCOME ? "border-green-200" : "border-red-200";
}

const Transactions = async (
  { page }: { page: number }
) => {
  const result = await getTransactions();

  if (!result.success) return <div>{result.message}</div>;
  if (result.data?.length === 0) return <div>No transactions found</div>;
  const isDescriptionEmpty = (transaction: Transaction) => {
    return transaction.description.length === 0 && transaction.description[0] !== "";
  }

  return (
    <div className="container">
      <FilterTransactions
        page={page}
      />
      <div className="flex flex-wrap items-stretch gap-8 justify-center">
        {result.data?.map((transaction) => (
          <Card
            key={transaction.id}
            className={`relative overflow-hidden min-w-96 flex flex-col ${getBorderBasedOnType(transaction.type)} `}
          >

            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <span className={`text-sm px-4 py-2 rounded-full ${getTypeStyle(transaction.type)}`}>
                  {formatTransactionType(transaction.type)}
                </span>
                <span>
                  {formatRupiah(Number(transaction.amount))}
                </span>
              </CardTitle>
              <CardDescription className="text-lg font-semibold">
                {format(new Date(transaction.transactionDate), "dd MMM yyyy, HH:mm")}

              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2 flex-grow">
              {transaction.category && (
                <div>
                  <span className="font-medium">Category:</span> {transaction.category}
                </div>
              )}

              {isDescriptionEmpty(transaction) && (
                <div>
                  <span className="font-medium">Descriptions:</span>
                  {transaction.description.map((desc, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {desc}
                    </p>
                  ))}
                </div>
              )}

              <div className="text-sm">
                <p className="font-medium">Transaction Date:</p>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Created: {format(new Date(transaction.createdAt), "dd MMM yyyy")}</p>
                <p>Updated: {format(new Date(transaction.updatedAt), "dd MMM yyyy")}</p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <BtnActionTransaction id={transaction.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transactions;