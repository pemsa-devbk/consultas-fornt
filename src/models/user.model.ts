import { Roles } from "./roles";

export interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    termsAndConditions: boolean;
    roles: Roles[];
}