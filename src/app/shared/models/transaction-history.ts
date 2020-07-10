export interface TransactionHistory {
    row_id: number;
    date: number;
    type: string;
    senderAddress: string;
    amount: number;
}