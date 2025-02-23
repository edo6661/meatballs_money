"use server";

import { SHARED, TRANSACTION_VALIDATION } from "@/constants/il8n";
import { handleActionError } from "@/utils/helper/handle_action_error";
import db from "@/lib/prisma";
import { getTransactionSchema } from "@/lib/zod/transation_schema";
import { TransactionErrorState } from "@/types/transaction_type";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const upsertTransaction = async (
  prevState: TransactionErrorState,
  formData: FormData
): Promise<TransactionErrorState> => {
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
  const transactionId = formData.get("transactionId");
  const transactionDate = new Date(transactionDateValue.toString());
  const description = formData.getAll("description");
  const category = formData.get("category");
  const userId = formData.get("userId");

  console.log("TYPE: ", type);

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
    if (!transactionId) {
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
        message: "Transaction successfully Created",
      };
    }
    await db.transaction.update({
      where: {
        id: transactionId as string,
      },
      data: {
        type: result.data.type,
        amount: result.data.amount,
        transactionDate: result.data.transactionDate,
        description: result.data.description,
        category: result.data.category,
        userId: result.data.userId,
        updatedAt: new Date(),
      },
    });
    revalidatePath("/");
    return {
      message: "Transaction successfully updated",
    };
  } catch (err) {
    await handleActionError(err);
    return {
      error: s("error.somethingWentWrong"),
    };
  }
};

export const deleteTransaction = async (id: string) => {
  const s = await getTranslations(SHARED);
  try {
    await db.transaction.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "Transaction successfully deleted",
    };
  } catch (err) {
    await handleActionError(err);
    return {
      error: s("error.somethingWentWrong"),
    };
  }
};
