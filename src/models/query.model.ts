import { TypeAccount } from "./type-account";

export interface QueryInfo {
    accounts: number[];
    type: TypeAccount;
    dateStart: string;
    dateEnd: string;
}