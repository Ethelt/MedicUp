export type Doctor = {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  deactivatedAt: Date | null;
};
