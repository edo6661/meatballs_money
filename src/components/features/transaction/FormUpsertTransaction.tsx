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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  useEffect(() => {
    if (state.message) {
      createToast({ title: state.message });
      router.push("/transactions");
    }
  }, [state, router]);

  const [descriptions, setDescriptions] = useState<string[]>(
    transaction?.description || [""]
  );

  useEffect(() => {
    if (transaction?.description) {
      setDescriptions(transaction.description);
    }
  }, [transaction]);

  const addDescription = () => {
    setDescriptions((prev) => [...prev, ""]);
  };

  const removeAllDescription = () => {
    setDescriptions([""]);
  }

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
    <Card className="container flex flex-col max-w-3xl">
      <CardHeader>
        <CardTitle>
          {transaction ? "Update Transaction" : "Create Transaction"}
        </CardTitle>
        <CardDescription>
          {transaction
            ? "Update your transaction details"
            : "Fill in the form to create a new transaction"}

        </CardDescription>

      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={create}>
          {transaction && (
            <Input type="hidden" name="transactionId" value={transaction.id} />
          )}
          <Input type="hidden" name="userId" value={user.id} />
          {state.formErrors?.userId?.map((error) => (
            <ErrorInputField error={error} key={error} />
          ))}

          <div>
            <Label htmlFor="type">{t("type")}</Label>
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
            <Label htmlFor="amount">{t("amount")}</Label>
            <Input
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
            <Label htmlFor="category">{t("category")}</Label>
            <Input
              type="text"
              name="category"
              id="category"
              defaultValue={transaction?.category || ""}
            />
          </div>

          <div>
            <Label htmlFor="transactionDate">{t("transactionDate")}</Label>
            <Input
              type="datetime-local"
              name="transactionDate"
              id="transactionDate"
              defaultValue={
                transaction
                  ? new Date(transaction.transactionDate).toISOString().slice(0, 16)
                  : ""
              }
            />
            {state.formErrors?.transactionDate?.map((error) => (
              <ErrorInputField error={error} key={error} />
            ))}
          </div>

          <div className="space-y-4">
            <Label>{t("description")}</Label>
            {descriptions.map((desc, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
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
            <div className="flex md:flex-row flex-col gap-4">
              <Button type="button" onClick={addDescription} className="w-full" variant="secondary">
                Add Description
              </Button>
              <Button type="button" onClick={removeAllDescription} className="w-full" variant="destructive">
                Remove Descriptions
              </Button>
            </div>
            {state.formErrors?.description?.map((error) => (
              <ErrorInputField error={error} key={error} />
            ))}
          </div>

          <Button disabled={isPending}>{t("submit")}</Button>
        </form>
      </CardContent>

    </Card>
  );
};

export default FormUpsertTransaction;
