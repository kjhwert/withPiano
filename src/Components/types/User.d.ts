export interface IUser {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone?: string;
  };
}
