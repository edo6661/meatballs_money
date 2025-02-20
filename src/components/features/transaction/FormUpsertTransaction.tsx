"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import ErrorInputField from "@/components/shared/ErrorInputField";
import { Button } from "@/components/ui/button";
import { TRANSACTION_FIELDS } from "@/constants/il8n";
import { useRouter } from "@/i18n/routing";
import { upsertTransaction } from "@/server/actions/transaction_action";
import createToast from "@/utils/create_toast";
import { User } from "@prisma/client";
import { PlainTransaction } from "@/types/transaction_type";
import { useTranslations } from "next-intl";
import { useActionState } from "react";

type FormUpsertTransactionProps = {
  user: User;
  transaction?: PlainTransaction;
};

const FormUpsertTransaction = ({
  user,
  transaction,
}: FormUpsertTransactionProps) => {
  const [state, create, isPending] = useActionState(upsertTransaction, {});
  const t = useTranslations(TRANSACTION_FIELDS);
  const router = useRouter();

  // Efek: tampilkan toast dan redirect jika ada pesan
  useEffect(() => {
    if (state.message) {
      createToast({ title: state.message });
      router.push("/transactions");
    }
  }, [state, router]);

  // State untuk input deskripsi (array of string)
  const [descriptions, setDescriptions] = useState<string[]>(
    transaction?.description || [""]
  );

  // Update state description jika ada perubahan di props transaction
  useEffect(() => {
    if (transaction?.description) {
      setDescriptions(transaction.description);
    }
  }, [transaction]);

  const addDescription = () => {
    setDescriptions((prev) => [...prev, ""]);
  };

  const removeDescription = (index: number) => {
    setDescriptions((prev) =>
      prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev
    );
  };

  const handleDescriptionChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescriptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className="container flex flex-col gap-12">
      <form className="flex flex-col gap-4" action={create}>
        {/* Jika transaction ada, berarti update, jadi sertakan hidden input untuk transactionId */}
        {transaction && (
          <input type="hidden" name="transactionId" value={transaction.id} />
        )}
        <input type="hidden" name="userId" value={user.id} />
        {state.formErrors?.userId?.map((error) => (
          <ErrorInputField error={error} key={error} />
        ))}

        <div>
          <label htmlFor="type">{t("type")}</label>
          <select
            name="type"
            id="type"
            defaultValue={transaction?.type || "INCOME"}
          >
            <option value="INCOME">{t("income")}</option>
            <option value="EXPENSE">{t("expense")}</option>
          </select>
          {state.formErrors?.type?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <div>
          <label htmlFor="amount">{t("amount")}</label>
          <input
            type="number"
            name="amount"
            id="amount"
            defaultValue={transaction?.amount || ""}
            required
          />
          {state.formErrors?.amount?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <div>
          <label htmlFor="category">{t("category")}</label>
          <input
            type="text"
            name="category"
            id="category"
            defaultValue={transaction?.category || ""}
          />
        </div>

        <div>
          <label htmlFor="transactionDate">{t("transactionDate")}</label>
          <input
            type="date"
            name="transactionDate"
            id="transactionDate"
            defaultValue={
              transaction
                ? new Date(transaction.transactionDate)
                  .toISOString()
                  .split("T")[0]
                : ""
            }
          />
          {state.formErrors?.transactionDate?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <div>
          <label>{t("description")}</label>
          {descriptions.map((desc, index) => (
            <div key={index} className="flex items-center gap-2">
              {/*
                Pastikan nama input "description" sama,
                agar FormData.getAll("description") dapat mengumpulkan semua nilai.
              */}
              <input
                type="text"
                name="description"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e)}
              />
              {descriptions.length > 1 && (
                <Button type="button" onClick={() => removeDescription(index)}>
                  –
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addDescription}>
            +
          </Button>
          {state.formErrors?.description?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}
        </div>

        <Button disabled={isPending}>{t("submit")}</Button>
      </form>
    </div>
  );
};

export default FormUpsertTransaction;
