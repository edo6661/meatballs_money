export interface BaseActionState {
  message?: string;
  error?: string;
}

export const initialBaseActionState: BaseActionState = {
  message: undefined,
  error: undefined,
};
