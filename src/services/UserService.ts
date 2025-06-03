import type { User, RegisterData } from "../types/user";
import { registerSchema } from "../validators/registerSchema";

export class UserService {
  private static STORAGE_KEY = "current_user";

  // Register new user after validation and email check
  static async register(
    userData: RegisterData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const validation = this.validateUserData(userData);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      const { email } = userData;
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        return { success: false, error: "E-postadressen är redan registrerad" };
      }

      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to save user");
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        error: "Något gick fel vid registreringen. Försök igen",
      };
    }
  }

  // Check if email is already registered
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      const existingUsers = await response.json();
      return existingUsers.some((user: User) => user.email === email);
    } catch (error) {
      console.error("Email check failed:", error);
      return false;
    }
  }

  // Authenticate user by email and password
  static async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const users = await response.json();
      const user = users.find(
        (u: User) => u.email === email && u.password === password
      );

      if (user) {
        this.setCurrentUser(user);
        return { success: true, user };
      } else {
        return {
          success: false,
          error: "Felaktig e-postadress eller lösenord",
        };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: "Något gick fel vid inloggningen. Försök igen",
      };
    }
  }

  // Retrieve current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  }

  // Save current user in localStorage
  static setCurrentUser(user: User): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save current user:", error);
    }
  }

  // Remove current user from localStorage (logout)
  static logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Validate user registration data using Zod schema
  static validateUserData(userData: Partial<RegisterData>): {
    isValid: boolean;
    error?: string;
  } {
    const result = registerSchema.safeParse(userData);
    if (!result.success) {
      const firstError = result.error.errors[0].message;
      return { isValid: false, error: firstError };
    }
    return { isValid: true };
  }
}
