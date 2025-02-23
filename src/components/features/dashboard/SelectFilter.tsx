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

interface SelectFilterProps {
  filter: FilterByDate;
  onChangeFilter: (value: FilterByDate) => void;
}

export function SelectFilter({ filter, onChangeFilter }: SelectFilterProps) {
  return (
    <Select onValueChange={onChangeFilter} defaultValue={filter}>
      <SelectTrigger >
        <SelectValue placeholder="Select a filter date" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
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
