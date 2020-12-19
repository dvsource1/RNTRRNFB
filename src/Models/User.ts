export type User = IUser | null;

interface IUser {
  username: string;
  email: string;
  password: string;
}
