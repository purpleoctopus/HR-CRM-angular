export interface AddApprovalRequest{
    approverId: string | null,
    leaveRequestId: string,
    status?: string,
    comment: string
}