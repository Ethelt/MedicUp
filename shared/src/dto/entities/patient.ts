export type Patient = {
  id: number;
  pesel: string | null;
  passportNumber: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  note: string | null;
  createdAt: Date;
  deactivatedAt: Date | null;
};
