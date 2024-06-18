import { AddEmployee } from "./add-employee.model";

export interface RegisterModel extends AddEmployee{
    username: string,
    email: string,
    password: string,
    roles: string[]
}