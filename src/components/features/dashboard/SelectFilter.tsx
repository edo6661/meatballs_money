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
import { filterByDateOptions } from "@/types/transaction_type";

interface SelectFilterProps {
  filter: string;
  onChangeFilter: (value: string) => void;
}

export function SelectFilter({ filter, onChangeFilter }: SelectFilterProps) {
  return (
    <Select onValueChange={onChangeFilter} defaultValue={filter}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a filter" />
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
