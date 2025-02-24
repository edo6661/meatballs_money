import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterByDate, filterByDateOptions } from "@/types/transaction_type";
import { useTranslations } from "next-intl";
import { TRANSACTION_PAGE } from "@/constants/il8n";

interface SelectFilterProps {
  filter: FilterByDate;
  onChangeFilter: (value: FilterByDate) => void;
}

export function SelectFilter({ filter, onChangeFilter }: SelectFilterProps) {
  const t = useTranslations(TRANSACTION_PAGE)
  return (
    <Select onValueChange={onChangeFilter} defaultValue={filter}>
      <SelectTrigger >
        <SelectValue placeholder={t("selectFilterDate")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("filterDate")}</SelectLabel>
          {filterByDateOptions.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
