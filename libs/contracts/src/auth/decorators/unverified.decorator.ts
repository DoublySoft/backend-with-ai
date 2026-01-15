import { SetMetadata } from "@nestjs/common";

export const IS_UNVERIFIED_KEY = "isUnverified";
export const Unverified = () => SetMetadata(IS_UNVERIFIED_KEY, true);
