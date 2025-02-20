import { BaseActionState } from "@/utils/common/action_state";

export interface SignUpState extends BaseActionState {
  formErrors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    confirmPassword?: string[];
  };
}

export interface SignInState extends BaseActionState {
  formErrors?: {
    email?: string[];
    password?: string[];
  };
}
