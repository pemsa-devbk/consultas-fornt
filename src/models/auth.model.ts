import { CompanyInfo } from "./company";
import { Status } from "./status";
import { UserInfo } from "./user.model";

export interface AuthInfo {
    status: Status;
    token: string | null;
    refreshToken: string;
    user: UserInfo;
    errorMessage: string[];
    company: CompanyInfo
}