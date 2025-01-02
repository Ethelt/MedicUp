import {
  DoctorLoginRequestDto,
  DoctorLoginResponseDto,
  PatientLoginRequestDto,
  PatientLoginResponseDto,
  PatientRegisterErrorDto,
  PatientRegisterRequestDto,
  PatientRegisterResponseDto,
  RegistrarLoginRequestDto,
  RegistrarLoginResponseDto,
} from "@medicup/shared";
import bcrypt from "bcrypt";
import { Session, SessionData } from "express-session";
import { Database } from "../../database/database";
import { ApiError } from "../../utils/errors";
import {
  removeDoctorSensitiveData,
  removePatientSensitiveData,
  removeRegistrarSensitiveData,
} from "../../utils/sensitive-data";

export class AuthService {
  static async loginPatient(
    loginRequestDto: PatientLoginRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<PatientLoginResponseDto> {
    const db = Database.getInstance();

    const patient = await db
      .selectFrom("patient")
      .selectAll()
      .where("email", "=", loginRequestDto.email)
      .executeTakeFirst();

    if (!patient) {
      throw new ApiError({
        message: "Invalid email or password",
      });
    }

    if (patient.deactivatedAt) {
      throw new ApiError({
        message: "Account deactivated",
      });
    }

    const passwordMatch = await bcrypt.compare(
      loginRequestDto.password,
      patient.password
    );
    if (!passwordMatch) {
      throw new ApiError({
        message: "Invalid email or password",
      });
    }

    if (!session) {
      throw new Error("No session available");
    }

    session.userId = patient.id;
    session.userType = "patient";
    session.save();

    return {
      patient: removePatientSensitiveData(patient),
    };
  }

  static async loginDoctor(
    loginRequestDto: DoctorLoginRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<DoctorLoginResponseDto> {
    const db = Database.getInstance();

    const doctor = await db
      .selectFrom("doctor")
      .selectAll()
      .where("login", "=", loginRequestDto.login)
      .executeTakeFirst();

    if (!doctor) {
      throw new ApiError({
        message: "Invalid login or password",
      });
    }

    if (doctor.deactivatedAt) {
      throw new ApiError({
        message: "Account deactivated",
      });
    }

    const passwordMatch = await bcrypt.compare(
      loginRequestDto.password,
      doctor.password
    );
    if (!passwordMatch) {
      throw new ApiError({
        message: "Invalid login or password",
      });
    }

    if (!session) {
      throw new Error("No session available");
    }

    session.userId = doctor.id;
    session.userType = "doctor";
    session.save();

    return {
      doctor: removeDoctorSensitiveData(doctor),
    };
  }

  static async loginRegistrar(
    loginRequestDto: RegistrarLoginRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<RegistrarLoginResponseDto> {
    const db = Database.getInstance();

    const registrar = await db
      .selectFrom("registrar")
      .selectAll()
      .where("login", "=", loginRequestDto.login)
      .executeTakeFirst();

    if (!registrar) {
      throw new ApiError({
        message: "Invalid login or password",
      });
    }

    if (registrar.deactivatedAt) {
      throw new ApiError({
        message: "Account deactivated",
      });
    }

    const passwordMatch = await bcrypt.compare(
      loginRequestDto.password,
      registrar.password
    );
    if (!passwordMatch) {
      throw new ApiError({
        message: "Invalid login or password",
      });
    }

    if (!session) {
      throw new Error("No session available");
    }

    session.userId = registrar.id;
    session.userType = "registrar";
    session.save();

    return {
      registrar: removeRegistrarSensitiveData(registrar),
    };
  }

  static async registerPatient(
    data: PatientRegisterRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<PatientRegisterResponseDto> {
    const db = Database.getInstance();

    const existingEmail = await db
      .selectFrom("patient")
      .select("id")
      .where("email", "=", data.email)
      .executeTakeFirst();

    if (existingEmail) {
      throw new ApiError<PatientRegisterErrorDto>({
        email: "Email already registered",
      });
    }

    const existingPhone = await db
      .selectFrom("patient")
      .select("id")
      .where("phone", "=", data.phoneNumber)
      .executeTakeFirst();

    if (existingPhone) {
      throw new ApiError<PatientRegisterErrorDto>({
        phoneNumber: "Phone number already registered",
      });
    }

    if ("pesel" in data) {
      const existingPesel = await db
        .selectFrom("patient")
        .select("id")
        .where("pesel", "=", data.pesel)
        .executeTakeFirst();

      if (existingPesel) {
        throw new ApiError<PatientRegisterErrorDto>({
          pesel: "PESEL already registered",
        });
      }
    } else {
      const existingPassport = await db
        .selectFrom("patient")
        .select("id")
        .where("passportNumber", "=", data.passportNumber)
        .executeTakeFirst();

      if (existingPassport) {
        throw new ApiError<PatientRegisterErrorDto>({
          passportNumber: "Passport number already registered",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const patient = await db
      .insertInto("patient")
      .values({
        email: data.email,
        phone: data.phoneNumber,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        pesel: "pesel" in data ? data.pesel : null,
        passportNumber: "passportNumber" in data ? data.passportNumber : null,
        note: null,
      })
      .returningAll()
      .executeTakeFirst();

    if (!patient) {
      throw new Error("Failed to create patient");
    }

    return this.loginPatient(
      { email: data.email, password: data.password },
      session
    );
  }

  static async logout(session: Session & Partial<SessionData>): Promise<void> {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
