export interface BaseActionState {
  message?: string;
  error?: string;
}

export const initialBaseActionState: BaseActionState = {
  message: undefined,
  error: undefined,
};

export interface SignUpState extends BaseActionState {
  formErrors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    confirmPassword?: string[];
  };
}
