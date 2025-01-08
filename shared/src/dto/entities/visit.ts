export type Visit = {
  id: number;
  patient: {
    id: number;
    firstName: string;
    lastName: string;
  };
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
  };
  patientNote: string | null;
  doctorPublicNote: string | null;
  doctorPrivateNote: string | null;
  startAt: string; // Date;
  endAt: string; // Date;
  cancelledAt: string | null; // Date;
};
