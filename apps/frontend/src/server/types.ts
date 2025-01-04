export type FormState<T extends Record<string, any>> = {
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
};

export type Session = {
  user: {
    id: string;
    login: string;
  };
  accessToken: string;
  // refreshToken: string
};
