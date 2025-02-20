import { BaseActionState } from "@/utils/common/action_state";

export interface TransactionState extends BaseActionState {
  formErrors?: {
    type?: string[];
    amount?: string[];
    transactionDate?: string[];
    description?: string[];
    userId?: string[];
  };
}
