export interface LeaveRequest{
    id: string,
    employeeId: string,
    absenceReason: string,
    startDate: string,
    endDate: string,
    comment: string,
    status: string
}