import { redirect } from "@/i18n/routing";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";
import { Transaction } from "@prisma/client";

export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data: T[] | null;
  error?: unknown;
}

export const getTransactions = async (): Promise<BaseResponse<Transaction>> => {
  try {
    const session = await auth();
    if (!session)
      return redirect({
        href: "/auth/login",
        locale: "id",
      });
    const transactions = await db.transaction.findMany({
      where: {
        userId: session.user.id,
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
