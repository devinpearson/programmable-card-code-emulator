import { Transaction } from "./transaction";
export interface ExecutionItem {
    executionId: string;
    rootCodeFunctionId: string;
    sandbox: boolean;
    type: string;
    authorizationApproved: boolean | null;
    logs: any[];
    smsCount: number;
    emailCount: number;
    pushNotificationCount: number;
    createdAt: string;
    startedAt: string;
    completedAt: string;
    updatedAt: string;
}
export declare enum TransactionType {
    BeforeTransaction = "before_transaction",
    AfterTransaction = "after_transaction",
    AfterDecline = "after_decline"
}
export declare const createExecutionItem: (transactionType: TransactionType, date: string, logs: any[]) => ExecutionItem;
export declare const run: (transaction: Transaction, code: string, environmentvariables: string) => Promise<Array<ExecutionItem>>;
//# sourceMappingURL=exec.d.ts.map