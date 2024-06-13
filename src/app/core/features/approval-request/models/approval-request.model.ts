export interface ApprovalRequest{
    id: string,
    approver: string,
    leaverequest: string,
    status?: string,
    comment: string
}