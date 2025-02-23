import { redirect } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { BaseResponse } from "@/types/response";
import {
  FilterByDate,
  IncomeExpenseGrouped,
  PlainTransaction,
  ProfitLossGrouped,
  TransactionFrequencyGrouped,
} from "@/types/transaction_type";
import { Transaction, TransactionType } from "@prisma/client";
import { Session } from "next-auth";
import {
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  startOfHour,
  startOfDay,
} from "date-fns";

export const avoidUserNull = async (): Promise<Session> => {
  try {
    const session = await auth();
    if (!session)
      return redirect({
        href: "/auth/login",
        locale: "id",
      });
    return session;
  } catch {
    return redirect({
      href: "/auth/login",
      locale: "id",
    });
  }
};

export const getTransactions = async (): Promise<
  BaseResponse<Transaction[]>
> => {
  try {
    const session = await avoidUserNull();
    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      success: true,
      data: transactions,
    };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};

export const getTransactionById = async (
  transactionId: string
): Promise<BaseResponse<PlainTransaction>> => {
  try {
    const transaction = await db.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction) {
      return {
        success: true,
        data: null,
      };
    }
    const plainTransaction: PlainTransaction = {
      ...transaction,
      amount: transaction.amount.toString(),
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      transactionDate: transaction.transactionDate.toISOString(),
    };

    return {
      success: true,
      // ! karena hanya plain object yang boleh di kasih ke client component, jadi harus diubah dulu, decimal gaboleh
      data: plainTransaction,
    };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};

export const getIncomeAndExpenseBasedOnFilter = async (
  filter: FilterByDate
): Promise<BaseResponse<IncomeExpenseGrouped[]>> => {
  try {
    const session = await avoidUserNull();
    const now = new Date();

    // Tentukan rentang waktu dan format pengelompokan
    let groupConfig: {
      start: Date;
      end: Date;
      groupBy: "hour" | "day" | "month" | "year";
    };

    switch (filter) {
      case FilterByDate.TODAY:
        groupConfig = {
          start: startOfToday(),
          end: endOfToday(),
          groupBy: "hour",
        };
        break;
      case FilterByDate.WEEK:
        groupConfig = {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
          groupBy: "day",
        };
        break;
      case FilterByDate.MONTH:
        groupConfig = {
          start: startOfMonth(now),
          end: endOfMonth(now),
          groupBy: "day",
        };
        break;
      case FilterByDate.YEAR:
        groupConfig = {
          start: startOfYear(now),
          end: endOfYear(now),
          groupBy: "month",
        };
        break;
      case FilterByDate.ALL:
      default:
        groupConfig = {
          start: new Date(0), // Semua waktu
          end: new Date(),
          groupBy: "year",
        };
        break;
    }

    // Query database
    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
        transactionDate: {
          gte: groupConfig.start,
          lte: groupConfig.end,
        },
      },
    });

    // Fungsi pengelompokan
    const groupedData = transactions.reduce((acc, transaction) => {
      let periodKey: string;
      let timestamp: Date;

      switch (groupConfig.groupBy) {
        case "hour":
          periodKey = format(transaction.transactionDate, "HH:00");
          timestamp = startOfHour(transaction.transactionDate);
          break;
        case "day":
          periodKey = format(transaction.transactionDate, "dd/MM");
          timestamp = startOfDay(transaction.transactionDate);
          break;
        case "month":
          periodKey = format(transaction.transactionDate, "MM/yyyy");
          timestamp = startOfMonth(transaction.transactionDate);
          break;
        case "year":
          periodKey = format(transaction.transactionDate, "yyyy");
          timestamp = startOfYear(transaction.transactionDate);
          break;
      }

      if (!acc[periodKey]) {
        acc[periodKey] = {
          period: periodKey,
          timestamp,
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        acc[periodKey].income += Number(transaction.amount);
      } else {
        acc[periodKey].expense += Number(transaction.amount);
      }

      return acc;
    }, {} as Record<string, IncomeExpenseGrouped>);

    // Konversi ke array dan urutkan
    const result = Object.values(groupedData).sort(
      (a, b) => a.timestamp!.getTime() - b.timestamp!.getTime()
    );

    return { success: true, data: result };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};
export const getProfitAndLossBasedOnFilter = async (
  filter: FilterByDate
): Promise<BaseResponse<ProfitLossGrouped[]>> => {
  try {
    const session = await avoidUserNull();
    const now = new Date();

    let groupConfig: {
      start: Date;
      end: Date;
      groupBy: "hour" | "day" | "month" | "year";
    };

    switch (filter) {
      case FilterByDate.TODAY:
        groupConfig = {
          start: startOfToday(),
          end: endOfToday(),
          groupBy: "hour",
        };
        break;
      case FilterByDate.WEEK:
        groupConfig = {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
          groupBy: "day",
        };
        break;
      case FilterByDate.MONTH:
        groupConfig = {
          start: startOfMonth(now),
          end: endOfMonth(now),
          groupBy: "day",
        };
        break;
      case FilterByDate.YEAR:
        groupConfig = {
          start: startOfYear(now),
          end: endOfYear(now),
          groupBy: "month",
        };
        break;
      case FilterByDate.ALL:
      default:
        groupConfig = {
          start: new Date(0),
          end: new Date(),
          groupBy: "year",
        };
        break;
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
        transactionDate: {
          gte: groupConfig.start,
          lte: groupConfig.end,
        },
      },
    });

    const groupedData = transactions.reduce((acc, transaction) => {
      // Pastikan transactionDate diparsing menjadi Date yang valid
      const transDate = new Date(transaction.transactionDate);
      let periodKey: string;
      let timestamp: Date;

      switch (groupConfig.groupBy) {
        case "hour":
          periodKey = format(transDate, "HH:00");
          timestamp = startOfHour(transDate);
          break;
        case "day":
          periodKey = format(transDate, "dd/MM");
          timestamp = startOfDay(transDate);
          break;
        case "month":
          periodKey = format(transDate, "MM/yyyy");
          timestamp = startOfMonth(transDate);
          break;
        case "year":
          periodKey = format(transDate, "yyyy");
          timestamp = startOfYear(transDate);
          break;
      }

      if (!acc[periodKey]) {
        acc[periodKey] = {
          period: periodKey,
          timestamp,
          net: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        acc[periodKey].net += Number(transaction.amount);
      } else {
        acc[periodKey].net -= Number(transaction.amount);
      }

      return acc;
    }, {} as Record<string, { period: string; timestamp: Date; net: number }>);

    const result: ProfitLossGrouped[] = Object.values(groupedData)
      .map((group) => {
        const profit = group.net > 0 ? group.net : 0;
        const loss = group.net < 0 ? Math.abs(group.net) : 0;
        return {
          period: group.period,
          timestamp: group.timestamp,
          profit,
          loss,
        };
      })
      .sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());

    return { success: true, data: result };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};
export const getTransactionFrequencyBasedOnFilter = async (
  filter: FilterByDate
): Promise<BaseResponse<TransactionFrequencyGrouped[]>> => {
  try {
    const session = await avoidUserNull();
    const now = new Date();

    let groupConfig: {
      start: Date;
      end: Date;
      groupBy: "hour" | "day" | "month" | "year";
    };

    switch (filter) {
      case FilterByDate.TODAY:
        groupConfig = {
          start: startOfToday(),
          end: endOfToday(),
          groupBy: "hour",
        };
        break;
      case FilterByDate.WEEK:
        groupConfig = {
          start: startOfWeek(now, { weekStartsOn: 1 }),
          end: endOfWeek(now, { weekStartsOn: 1 }),
          groupBy: "day",
        };
        break;
      case FilterByDate.MONTH:
        groupConfig = {
          start: startOfMonth(now),
          end: endOfMonth(now),
          groupBy: "day",
        };
        break;
      case FilterByDate.YEAR:
        groupConfig = {
          start: startOfYear(now),
          end: endOfYear(now),
          groupBy: "month",
        };
        break;
      case FilterByDate.ALL:
      default:
        groupConfig = {
          start: new Date(0),
          end: new Date(),
          groupBy: "year",
        };
        break;
    }

    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
        transactionDate: {
          gte: groupConfig.start,
          lte: groupConfig.end,
        },
      },
    });

    const groupedData = transactions.reduce((acc, transaction) => {
      const transDate = new Date(transaction.transactionDate);
      let periodKey: string;
      let timestamp: Date;

      switch (groupConfig.groupBy) {
        case "hour":
          periodKey = format(transDate, "HH:00");
          timestamp = startOfHour(transDate);
          break;
        case "day":
          periodKey = format(transDate, "dd/MM");
          timestamp = startOfDay(transDate);
          break;
        case "month":
          periodKey = format(transDate, "MM/yyyy");
          timestamp = startOfMonth(transDate);
          break;
        case "year":
          periodKey = format(transDate, "yyyy");
          timestamp = startOfYear(transDate);
          break;
      }

      if (!acc[periodKey]) {
        acc[periodKey] = {
          period: periodKey,
          timestamp,
          income: 0,
          expense: 0,
        };
      }

      if (transaction.type === TransactionType.INCOME) {
        acc[periodKey].income++;
      } else {
        acc[periodKey].expense++;
      }

      return acc;
    }, {} as Record<string, TransactionFrequencyGrouped>);

    const result: TransactionFrequencyGrouped[] = Object.values(
      groupedData
    ).sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());

    return { success: true, data: result };
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};
