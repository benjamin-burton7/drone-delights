import type { User, RegisterData } from "../types/user";
import { registerSchema } from "../validators/registerSchema";

export class UserService {
  private static STORAGE_KEY = "current_user";

  /**
   * Registers new user after validating input and checking email uniqueness
   *
   * @param userData - User's registration data
   * @returns Success boolean or error message
   */
  static async register(
    userData: RegisterData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const validation = this.validateUserData(userData);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }

      const emailExists = await this.checkEmailExists(userData.email);
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

  /**
   * Checks if user with given email already exists
   *
   * @param email - Email address to check
   * @returns `true` if already exists, `false` otherwise
   */
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

  /**
   * Authenticates user using email and password
   *
   * @param email - User's email.
   * @param password - User's password
   * @returns Auth result with user data if successful
   */
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

  /**
   * Retrieves current user from localStorage
   *
   * @returns Current user object or `null` if none.
   */
  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  }

  /**
   * Saves current user in localStorage
   *
   * @param user - User object to save
   */
  static setCurrentUser(user: User): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save current user:", error);
    }
  }

  /**
   * Logs out current user by clearing localStorage
   */
  static logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  /**
   * Validates user registration data using Zod schema
   *
   * @param userData - Registration data to validate
   * @returns Whether data is valid and possible error message
   */
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
