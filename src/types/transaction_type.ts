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
export enum FilterByDate {
  TODAY = "TODAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
  ALL = "ALL",
}

export const filterByDateOptions = [
  { value: FilterByDate.TODAY, label: "Today" },
  { value: FilterByDate.WEEK, label: "This Week" },
  { value: FilterByDate.MONTH, label: "This Month" },
  { value: FilterByDate.YEAR, label: "This Year" },
  { value: FilterByDate.ALL, label: "All" },
];

export const filterByDateDefaultValue: FilterByDate = FilterByDate.ALL;

export interface IncomeExpenseAggregate {
  income: number;
  expense: number;
}

export interface IncomeExpenseGrouped extends IncomeExpenseAggregate {
  month: string;
}
