import { CodeService } from "../code.service";

export class MockCodeService extends CodeService {
  private fixedCode: string | null = null;

  setFixedCode(code: string): void {
    this.fixedCode = code;
  }

  override generateVerificationCode(_length: number = 6): string {
    if (this.fixedCode) {
      return this.fixedCode;
    }
    return "123456";
  }

  override generateRandomCode(_length: number = 32): string {
    if (this.fixedCode) {
      return this.fixedCode;
    }
    return "mock-random-code";
  }

  override generateRecoveryCode(_length: number = 8): string {
    if (this.fixedCode) {
      return this.fixedCode;
    }
    return "MOCKRECOVERY";
  }

  override generateSecureToken(_length: number = 32): string {
    if (this.fixedCode) {
      return this.fixedCode;
    }
    return "mock-secure-token";
  }
}
