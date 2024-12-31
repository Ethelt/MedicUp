import {
  PatientRegisterErrorDto,
  PatientRegisterRequestDto,
  PatientRegisterResponseDto,
} from "@medicup/shared";
import bcrypt from "bcrypt";
import { Database } from "../../database/database";
import { ApiError } from "../../utils/errors";

export class AuthService {
  static async loginPatient(): Promise<string> {
    return "Patient login successful";
  }

  static async loginDoctor(): Promise<string> {
    return "Doctor login successful";
  }

  static async loginRegistrar(): Promise<string> {
    return "Registrar login successful";
  }

  static async registerPatient(
    data: PatientRegisterRequestDto
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

    // Remove sensitive data before returning
    const { password: _, ...patientWithoutPassword } = patient;

    return { patient: patientWithoutPassword };
  }

  static async logout(): Promise<string> {
    return "Logout successful";
  }
}
