import { EUserRole } from "../enums/user-role.enum";

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: EUserRole[];
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
  locale?: string;
  isDeleted: boolean;
  deletedAt?: Date;
  deletedById?: string;
  createdAt: Date;
  updatedAt: Date;
}
