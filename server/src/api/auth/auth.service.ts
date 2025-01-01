import {
  PatientLoginRequestDto,
  PatientLoginResponseDto,
  PatientRegisterErrorDto,
  PatientRegisterRequestDto,
  PatientRegisterResponseDto,
} from "@medicup/shared";
import bcrypt from "bcrypt";
import { Session, SessionData } from "express-session";
import { Database } from "../../database/database";
import { ApiError } from "../../utils/errors";
import { removePatientSensitiveData } from "../../utils/sensitive-data";

export class AuthService {
  static async loginPatient(
    loginRequestDto: PatientLoginRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<PatientLoginResponseDto> {
    const db = Database.getInstance();

    // Find patient with matching email
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

    // Verify password
    const passwordMatch = await bcrypt.compare(
      loginRequestDto.password,
      patient.password
    );
    if (!passwordMatch) {
      throw new ApiError({
        message: "Invalid email or password",
      });
    }

    // Set session data
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

  static async loginDoctor(): Promise<string> {
    return "Doctor login successful";
  }

  static async loginRegistrar(): Promise<string> {
    return "Registrar login successful";
  }

  static async registerPatient(
    data: PatientRegisterRequestDto,
    session: Session & Partial<SessionData>
  ): Promise<PatientRegisterResponseDto> {
    const db = Database.getInstance();

    // Check if patient with same email already exists
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

    // Check if patient with same phone number already exists
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

    // Check if patient with same PESEL/passport exists
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the patient
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

    // Login patient
    return this.loginPatient(
      { email: data.email, password: data.password },
      session
    );
  }

  static async logout(): Promise<string> {
    return "Logout successful";
  }
}
