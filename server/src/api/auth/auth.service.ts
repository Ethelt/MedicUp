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

  static async registerPatient(): Promise<string> {
    return "Patient registration successful";
  }

  static async logout(): Promise<string> {
    return "Logout successful";
  }
}
