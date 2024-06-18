import { Employee } from "./employee.model";

export interface AddEmployee{
    fullName: string,
    subdivizion: string,
    position: string,
    status: string,
    peoplePartnerId: string,
    ooO_balance: number,
    photo?: Blob
}