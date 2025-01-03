export type Visit = {
  id: number;
  patientId: number;
  doctorId: number;
  patientNote: string | null;
  doctorPublicNote: string | null;
  doctorPrivateNote: string | null;
  startAt: Date;
  endAt: Date;
  cancelledAt: Date | null;
};
