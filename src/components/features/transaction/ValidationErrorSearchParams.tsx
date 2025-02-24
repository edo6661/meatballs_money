interface ValidationErrorSearchParamsProps {
  errorLabel: string;
  allowedValues: string[];
}

export default function ValidationErrorSearchParams({ errorLabel, allowedValues }: ValidationErrorSearchParamsProps) {
  return (
    <div className="container p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
      <p>
        {errorLabel} tidak valid. Nilai yang diperbolehkan: {allowedValues.join(", ")}
      </p>
    </div>
  );
}
