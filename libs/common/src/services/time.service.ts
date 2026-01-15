import { Injectable } from "@nestjs/common";

@Injectable()
export class TimeService {
  /**
   * Get current timestamp
   * @returns Current Date object
   */
  now(): Date {
    return new Date();
  }

  /**
   * Get current timestamp as ISO string
   * @returns ISO string timestamp
   */
  nowISO(): string {
    return new Date().toISOString();
  }

  /**
   * Get current timestamp as Unix timestamp
   * @returns Unix timestamp in seconds
   */
  nowUnix(): number {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Add time to a date
   * @param date - Base date
   * @param amount - Amount to add
   * @param unit - Unit of time (seconds, minutes, hours, days)
   * @returns New Date object
   */
  addTime(
    date: Date,
    amount: number,
    unit: "seconds" | "minutes" | "hours" | "days",
  ): Date {
    const newDate = new Date(date);
    const multipliers = {
      seconds: 1000,
      minutes: 60 * 1000,
      hours: 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000,
    };

    newDate.setTime(newDate.getTime() + amount * multipliers[unit]);
    return newDate;
  }

  /**
   * Check if a date is expired
   * @param date - Date to check
   * @param expirationDate - Expiration date
   * @returns True if expired, false otherwise
   */
  isExpired(date: Date, expirationDate?: Date): boolean {
    if (!expirationDate) {
      return false;
    }
    return new Date() > expirationDate;
  }

  /**
   * Get expiration date from now
   * @param amount - Amount of time
   * @param unit - Unit of time
   * @returns Expiration Date object
   */
  getExpirationDate(
    amount: number,
    unit: "seconds" | "minutes" | "hours" | "days",
  ): Date {
    return this.addTime(this.now(), amount, unit);
  }

  /**
   * Parse duration string (e.g., "7d", "30d", "1h")
   * @param duration - Duration string
   * @returns Object with amount and unit
   */
  parseDuration(duration: string): {
    amount: number;
    unit: "seconds" | "minutes" | "hours" | "days";
  } {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
      throw new Error(`Invalid duration format: ${duration}`);
    }

    const amount = parseInt(match[1], 10);
    const unitMap: Record<string, "seconds" | "minutes" | "hours" | "days"> = {
      s: "seconds",
      m: "minutes",
      h: "hours",
      d: "days",
    };

    return {
      amount,
      unit: unitMap[match[2]],
    };
  }

  /**
   * Get expiration date from duration string
   * @param duration - Duration string (e.g., "7d")
   * @returns Expiration Date object
   */
  getExpirationFromDuration(duration: string): Date {
    const { amount, unit } = this.parseDuration(duration);
    return this.getExpirationDate(amount, unit);
  }
}
