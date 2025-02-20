import { BaseActionState } from "@/utils/common/action_state";
import { Transaction } from "@prisma/client";

export interface TransactionState extends BaseActionState {
  formErrors?: {
    type?: string[];
    amount?: string[];
    transactionDate?: string[];
    description?: string[];
    userId?: string[];
  };
}

export type PlainTransaction = Omit<
  Transaction,
  "amount" | "createdAt" | "updatedAt" | "transactionDate"
> & {
  amount: string;
  createdAt: string;
  updatedAt: string;
  transactionDate: string;
};
enum filterByDate {
  TODAY,
  WEEK,
  MONTH,
  YEAR,
  ALL,
}

export type FilterByDate = keyof typeof filterByDate;

export interface TransactionFilter {
  filterByDate: filterByDate;
  startDate?: string;
  endDate?: string;
}
