export interface AddLeaveRequest{
    employeeId: string | null,
    absenceReason: string,
    startDate: string,
    endDate: string,
    comment: string,
    status: string
}