import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  /**
   * Hash a plain text password
   * @param plainText - Plain text to hash
   * @returns Hashed string
   */
  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  /**
   * Compare plain text with hash
   * @param plainText - Plain text to compare
   * @param hash - Hash to compare against
   * @returns True if match, false otherwise
   */
  async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  /**
   * Generate a hash for a given value
   * @param value - Value to hash
   * @returns Hashed string
   */
  async hashValue(value: string): Promise<string> {
    return this.hash(value);
  }
}
