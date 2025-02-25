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

interface SelectOptionProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
  label: string;
  options: { value: string | null; label: string }[];
  placeholder: string;
}

export function SelectOption({
  defaultValue,
  options,
  label,
  onValueChange,
  placeholder
}: SelectOptionProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value ?? ""}>
              {item.label}
            </SelectItem>
          ))}
          { }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
