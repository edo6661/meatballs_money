import { BaseActionState } from "@/utils/common/action_state";
import { Transaction, TransactionType } from "@prisma/client";

export interface TransactionErrorState extends BaseActionState {
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
export const initialFormDataTransaction: PlainTransaction = {
  amount: "",
  category: "",
  description: [""],
  type: TransactionType.INCOME,
  userId: "",
  createdAt: "",
  updatedAt: "",
  transactionDate: "",
  id: "",
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
  period: string;
  timestamp?: Date;
}

export interface ProfitLossGrouped {
  period: string;
  timestamp?: Date;
  profit: number;
  loss: number;
}

export interface TransactionFrequencyGrouped {
  period: string;
  timestamp?: Date;
  income: number;
  expense: number;
}
