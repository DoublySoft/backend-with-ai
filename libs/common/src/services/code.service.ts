import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class CodeService {
  /**
   * Generate a random verification code
   * @param length - Length of the code (default: 6)
   * @returns Random numeric code
   */
  generateVerificationCode(length: number = 6): string {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code.toString();
  }

  /**
   * Generate a random alphanumeric code
   * @param length - Length of the code (default: 32)
   * @returns Random alphanumeric code
   */
  generateRandomCode(length: number = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }

  /**
   * Generate a recovery code
   * @param length - Length of the code (default: 8)
   * @returns Random alphanumeric recovery code
   */
  generateRecoveryCode(length: number = 8): string {
    return crypto.randomBytes(length).toString("hex").toUpperCase();
  }

  /**
   * Generate a secure token
   * @param length - Length of the token in bytes (default: 32)
   * @returns Secure random token
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString("base64url");
  }
}
