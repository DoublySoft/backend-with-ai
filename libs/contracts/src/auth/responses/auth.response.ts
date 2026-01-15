import { SuccessResponse } from "@libs/common";

export type AuthResponse = SuccessResponse<{
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
  };
  accessToken: string;
  refreshToken?: string;
}>;
