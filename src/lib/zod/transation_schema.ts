import { TransactionType } from "@prisma/client";
import * as z from "zod";

export const getTransactionSchema = (t?: (key: string) => string) => {
  return z.object({
    type: z.nativeEnum(TransactionType).default(TransactionType.EXPENSE),
    amount: z.number().positive({
      message: t ? t("amountPositive") : "Amount must be positive",
    }),
    transactionDate: z.coerce.date({
      message: t ? t("dateInvalid") : "Invalid date",
    }),

    description: z
      .string()
      .array()
      .nonempty({
        message: t ? t("descriptionFilled") : "Description must be filled",
      }),
    category: z.string().optional(),
    userId: z.string({
      message: t ? t("userIdEmpty") : "User Id cannot be empty",
    }),
  });
};

export type TransactionFormValues = z.infer<
  Awaited<ReturnType<typeof getTransactionSchema>>
>;
