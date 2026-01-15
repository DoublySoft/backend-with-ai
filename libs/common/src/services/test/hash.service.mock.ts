import { HashService } from "../hash.service";

export class MockHashService extends HashService {
  private hashMap: Map<string, string> = new Map();

  override async hash(plainText: string): Promise<string> {
    const hashed = `hashed_${plainText}`;
    this.hashMap.set(plainText, hashed);
    return hashed;
  }

  override async compare(plainText: string, hash: string): Promise<boolean> {
    const storedHash = this.hashMap.get(plainText);
    if (storedHash) {
      return storedHash === hash;
    }
    // For testing: compare with mock hash format
    return hash === `hashed_${plainText}`;
  }

  override async hashValue(value: string): Promise<string> {
    return this.hash(value);
  }
}
