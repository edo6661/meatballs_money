"use server";

import { SHARED, TRANSACTION_VALIDATION } from "@/constants/il8n";
import { handleActionError } from "@/helper/handle_action_error";
import db from "@/lib/prisma";
import { getTransactionSchema } from "@/lib/zod/transation_schema";
import { TransactionState } from "@/types/transaction_type";
import { getTranslations } from "next-intl/server";

export const createTransaction = async (
  prevState: TransactionState,
  formData: FormData
): Promise<TransactionState> => {
  const t = await getTranslations(TRANSACTION_VALIDATION);
  const s = await getTranslations(SHARED);
  const type = formData.get("type");
  const amount = formData.get("amount");
  const transactionDateValue = formData.get("transactionDate");
  if (!transactionDateValue) {
    return {
      formErrors: {
        transactionDate: [t("transactionDateRequired")],
      },
    };
  }
  const transactionDate = new Date(transactionDateValue.toString());
  const description = formData.getAll("description");
  const category = formData.get("category");
  const userId = formData.get("userId");

  const result = getTransactionSchema(t).safeParse({
    type: type,
    amount: +amount!,
    transactionDate: transactionDate,
    description: description,
    category: category,
    userId: userId,
  });

  if (!result.success) {
    return {
      formErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.transaction.create({
      data: {
        type: result.data.type,
        amount: result.data.amount,
        transactionDate: result.data.transactionDate,
        description: result.data.description,
        category: result.data.category,
        userId: result.data.userId,
      },
    });

    return {
      message: "Transaction created successfully",
    };
  } catch (err) {
    await handleActionError(err);
    return {
      error: s("error.somethingWentWrong"),
    };
  }
};
