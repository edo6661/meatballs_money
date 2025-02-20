import { redirect } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { BaseResponse } from "@/types/response";
import { PlainTransaction } from "@/types/transaction_type";
import { Transaction } from "@prisma/client";

export const getTransactions = async (): Promise<
  BaseResponse<Transaction[]>
> => {
  try {
    const session = await auth();
    if (!session)
      return redirect({
        href: "/auth/login",
        locale: "id",
      });
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
    const session = await auth();
    if (!session)
      return redirect({
        href: "/auth/login",
        locale: "id",
      });
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
