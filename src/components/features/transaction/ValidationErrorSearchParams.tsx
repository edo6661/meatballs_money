import { TRANSACTION_PAGE } from "@/constants/il8n";
import { getTranslations } from "next-intl/server";

interface ValidationErrorSearchParamsProps {
  errorLabel: string;
  allowedValues: string[];
}

export default async function ValidationErrorSearchParams({ errorLabel, allowedValues }: ValidationErrorSearchParamsProps) {
  const t = await getTranslations(TRANSACTION_PAGE)

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
      <p>
        {errorLabel} {t("allowedValue")}: {allowedValues.join(", ")}
      </p>
    </div>
  );
}
