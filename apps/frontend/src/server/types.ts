export type FormState<T extends Record<string, any>> = {
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
};
