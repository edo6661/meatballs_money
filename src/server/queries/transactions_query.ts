import { redirect } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { BaseResponse } from "@/types/response";
import {
  FilterByDate,
  IncomeExpenseAggregate,
  IncomeExpenseGrouped,
  PlainTransaction,
} from "@/types/transaction_type";
import { Prisma, Transaction, TransactionType } from "@prisma/client";
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
    const transactions = (await db.$queryRaw`
      SELECT *, GREATEST("createdAt", "updatedAt") as "latestTimestamp"
      FROM "Transaction"
      WHERE "userId" = ${session.user.id}
      ORDER BY "latestTimestamp" DESC
    `) as Transaction[];

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
): Promise<BaseResponse<IncomeExpenseAggregate | IncomeExpenseGrouped[]>> => {
  try {
    // Pastikan session valid
    const session = await avoidUserNull();
    const now = new Date();

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    // Tentukan rentang tanggal berdasarkan filter
    switch (filter) {
      case FilterByDate.TODAY:
        startDate = startOfToday();
        endDate = endOfToday();
        break;
      case FilterByDate.WEEK:
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case FilterByDate.MONTH:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case FilterByDate.YEAR:
        startDate = startOfYear(now);
        endDate = endOfYear(now);
        break;
      case FilterByDate.ALL:
      default:
        // Tidak menetapkan filter tanggal untuk ALL
        break;
    }

    // Gunakan Prisma.TransactionWhereInput untuk tipe whereClause
    const whereClause: Prisma.TransactionWhereInput = {
      userId: session.user.id,
      ...(filter !== FilterByDate.ALL &&
        startDate &&
        endDate && {
          transactionDate: {
            gte: startDate,
            lte: endDate,
          },
        }),
    };

    // Ambil data transaksi dari database
    const transactions = await db.transaction.findMany({
      where: whereClause,
    });
    if (filter === FilterByDate.YEAR || filter === FilterByDate.ALL) {
      const groupedData = transactions.reduce(
        (acc: Record<string, IncomeExpenseAggregate>, curr) => {
          // Kelompokkan berdasarkan bulan dengan format "yyyy-MM"
          const month = format(curr.transactionDate, "yyyy-MM");
          if (!acc[month]) {
            acc[month] = { income: 0, expense: 0 };
          }
          if (curr.type === TransactionType.INCOME) {
            acc[month].income += Number(curr.amount);
          } else if (curr.type === TransactionType.EXPENSE) {
            acc[month].expense += Number(curr.amount);
          }
          return acc;
        },
        {} as Record<string, IncomeExpenseAggregate>
      );

      // Sort keys (bulan) secara descending
      const result: IncomeExpenseGrouped[] = Object.keys(groupedData)
        .sort((a, b) => {
          // Karena format "yyyy-MM" bisa dibandingkan secara lexicografis
          if (a < b) return 1;
          if (a > b) return -1;
          return 0;
        })
        .map((month) => ({
          month,
          income: groupedData[month].income,
          expense: groupedData[month].expense,
        }));

      return {
        success: true,
        data: result,
      };
    } else {
      // Untuk filter TODAY, WEEK, dan MONTH, hitung total keseluruhan
      const income = transactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expense = transactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const result: IncomeExpenseAggregate = { income, expense };

      return {
        success: true,
        data: result,
      };
    }
  } catch (e) {
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      error: e,
    };
  }
};
