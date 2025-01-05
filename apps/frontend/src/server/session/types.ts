export type Session = {
  user: {
    id: string;
    login: string;
  };
  accessToken: string;
  refreshToken: string;
};
