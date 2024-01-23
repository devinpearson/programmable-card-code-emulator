import { Transaction } from "./transaction";
export declare const createExecutionItem: (transactionType: string, date: string, logs: any[]) => {
    executionId: any;
    rootCodeFunctionId: any;
    sandbox: boolean;
    type: string;
    authorizationApproved: null;
    logs: {
        createdAt: string;
        level: string;
        content: string;
    }[];
    smsCount: number;
    emailCount: number;
    pushNotificationCount: number;
    createdAt: string;
    startedAt: string;
    completedAt: string;
    updatedAt: string;
};
export declare const run: (transaction: Transaction, code: string, environmentvariables: string) => Promise<{
    executionId: any;
    rootCodeFunctionId: any;
    sandbox: boolean;
    type: string;
    authorizationApproved: null;
    logs: {
        createdAt: string;
        level: string;
        content: string;
    }[];
    smsCount: number;
    emailCount: number;
    pushNotificationCount: number;
    createdAt: string;
    startedAt: string;
    completedAt: string;
    updatedAt: string;
}[]>;
//# sourceMappingURL=exec.d.ts.map