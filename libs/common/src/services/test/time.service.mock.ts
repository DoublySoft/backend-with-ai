import { TimeService } from "../time.service";

export class MockTimeService extends TimeService {
  private fixedDate: Date | null = null;

  setFixedDate(date: Date): void {
    this.fixedDate = date;
  }

  override now(): Date {
    return this.fixedDate || new Date("2024-01-01T00:00:00Z");
  }

  override nowISO(): string {
    return this.now().toISOString();
  }

  override nowUnix(): number {
    return Math.floor(this.now().getTime() / 1000);
  }
}
