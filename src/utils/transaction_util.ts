import { FilterByDate } from "@/types/transaction_type";

export const getXAxisFormat = (filter: FilterByDate) => {
  switch (filter) {
    case FilterByDate.TODAY:
      return "HH:00";
    case FilterByDate.WEEK:
    case FilterByDate.MONTH:
      return "dd/MM";
    case FilterByDate.YEAR:
      return "MM/yyyy";
    case FilterByDate.ALL:
      return "yyyy";
    default:
      return "dd/MM/yyyy";
  }
};
