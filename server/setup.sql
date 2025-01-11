insert into doctor (login, password, "firstName", "lastName") 
values ('adam_doktorski', '$2b$10$A3Qh65c1ppWQxe.jhlMMCOCOpx3DAleIYTaK37ptibAD870v23c4K', 'Adam', 'Doktorski');
insert into doctor (login, password, "firstName", "lastName") 
values ('doctor', '$2b$10$OmeNTv3yYPE1V5R6fFc8DOyFXlBsaAzoOXjET35zWLiPSCcnS5T.W', 'Darek', 'Doktor');

insert into registrar (login, password) values ('rejestrator', '$2b$10$EquuajpRz/TIiNWzzqAKO.grCEhO6pqvdnXwmzBQp4FOdtyGeFHWu');
insert into registrar (login, password) values ('registrar', '$2b$10$wD2WznS1XxBYEVfGfYcwOOFQDOVaelJ4ze27bjSiOXo2pres8ahJW');

INSERT INTO patient ("firstName", "lastName", "email", "phone", "password", "pesel") 
VALUES ('patient1', 'patient2', 'patient1.patient2@test.com', '123456789', '$2b$10$oKU6bYi.XT2cBKbF8v7xseGzVYTZF3ToTWgaDb21sVoXWzksFUjfy', '12345678901');

insert into visit ("patientId", "doctorId", "startAt", "endAt") values (1, 1, '2025-01-01T12:00:00Z', '2025-01-01T15:00:00Z');
insert into visit ("patientId", "doctorId", "startAt", "endAt", "cancelledAt") 
values (1, 2, '2025-01-01T13:00:00Z', '2025-01-01T15:00:00Z', '2025-01-01T10:00:00Z');
insert into visit ("patientId", "doctorId", "startAt", "endAt") values (1, 2, '2025-01-01T13:00:00Z', '2025-01-01T15:00:00Z');
