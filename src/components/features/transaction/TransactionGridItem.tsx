import React from 'react'
import BtnActionTransaction from "./BtnActionTransaction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { formatTransactionType } from "@/utils/format_transaction";
import { formatRupiah } from "@/utils/format_currency";
import { Transaction, TransactionType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import { TRANSACTION_PAGE } from '@/constants/il8n';


const TransactionGridItem = async (
  {
    amount,
    category,
    createdAt,
    description,
    id,
    transactionDate,
    type,
    updatedAt,

  }: Transaction
) => {

  const getTypeStyle = (type: TransactionType) => {
    return type === TransactionType.INCOME
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-red-100 text-red-800 border-red-300";
  };
  const getBorderBasedOnType = (type: TransactionType) => {
    return type === TransactionType.INCOME ? "border-green-200" : "border-red-200";
  }
  const isDescriptionEmpty = (description: string[]) => {
    return description.length === 0 && description[0] !== "";
  }
  const t = await getTranslations(TRANSACTION_PAGE)

  return (
    <Card
      className={`relative overflow-hidden w-full max-w-96 flex flex-col ${getBorderBasedOnType(type)} `}
    >

      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className={`text-sm px-4 py-2 rounded-full ${getTypeStyle(type)}`}>
            {formatTransactionType(type)}
          </span>
          <span>
            {formatRupiah(Number(amount))}
          </span>
        </CardTitle>
        <CardDescription className="text-lg font-semibold">
          {format(new Date(transactionDate), "dd MMM yyyy, HH:mm")}

        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 flex-grow">
        {category && (
          <div>
            <span className="font-medium">{t("category")}:</span> {category}
          </div>
        )}

        {isDescriptionEmpty(description) && (
          <div>
            <span className="font-medium">{t("descriptions")}:</span>
            {description.map((desc, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {desc}
              </p>
            ))}
          </div>
        )}

        <div className="text-sm">
          <p className="font-medium">{t("transactionDate")}:</p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>{t("createdAt")}: {format(new Date(createdAt), "dd MMM yyyy")}</p>
          <p>{t("updatedAt")}: {format(new Date(updatedAt), "dd MMM yyyy")}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <BtnActionTransaction id={id} />
      </CardFooter>
    </Card>
  )
}

export default TransactionGridItem