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
  { value: FilterByDate.ALL, label: "All Time" },
];

export enum TransactionTypeWithAll {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  ALL = "ALL",
}

export const filterByTransactionTypeOptions = [
  {
    value: TransactionTypeWithAll.INCOME,
    label: "Income",
  },
  {
    value: TransactionTypeWithAll.EXPENSE,
    label: "Expense",
  },
  {
    value: TransactionTypeWithAll.ALL,
    label: "All Transaction Type",
  },
];

export enum TransactionView {
  TABLE = "TABLE",
  GRID = "GRID",
}

export const transactionViewOptions = [
  {
    value: TransactionView.TABLE,
    label: "Table",
  },
  {
    value: TransactionView.GRID,
    label: "Grid",
  },
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

export const isValidFilter = (value: string): value is FilterByDate =>
  Object.values(FilterByDate).includes(value as FilterByDate);

export const isValidTransactionType = (
  value: string
): value is TransactionTypeWithAll => {
  if (!value) return true;
  return Object.values(TransactionTypeWithAll).includes(
    value as TransactionTypeWithAll
  );
};

export const isValidViewType = (value: string) =>
  Object.values(TransactionView).includes(value as TransactionView);
