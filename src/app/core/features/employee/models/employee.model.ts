export interface Employee{
    id: string,
    fullName: string,
    subdivizion: string,
    position: string,
    status: string,
    peoplePartnerId: string,
    peoplePartner: Employee,
    ooO_balance: number,
    photo?: Blob
}