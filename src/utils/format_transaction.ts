import { TransactionType } from "@prisma/client";

export const formatTransactionType = (type: TransactionType) => {
  return {
    [TransactionType.INCOME]: "Income",
    [TransactionType.EXPENSE]: "Expense",
  }[type];
};
