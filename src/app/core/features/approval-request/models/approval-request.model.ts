export interface ApprovalRequest{
    id: string,
    approverId: string | null,
    leaveRequestId: string,
    status?: string,
    comment: string
}