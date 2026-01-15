import { SuccessResponse } from "@libs/common";

export type AccessTokenResponse = SuccessResponse<{
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}>;
