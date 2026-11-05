import type { Transaction } from './transaction.js';
import { v4 as uuidv4 } from 'uuid';
import { IsolatedVmSandbox } from './isolated-vm-sandbox.js';
import type { Sandbox } from './sandbox.js';

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

export enum TransactionType {
  BeforeTransaction = 'before_transaction',
  AfterTransaction = 'after_transaction',
  AfterDecline = 'after_decline',
}

export enum LogLevel {
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export const createExecutionItem = (
  transactionType: TransactionType,
  date: string,
  logs: any[],
  warns: any[],
  errors: any[],
): ExecutionItem => {
  let tempLogs = [];
  for (let i = 0; i < logs.length; i++) {
    let log = {
      createdAt: date,
      level: 'info',
      content: JSON.stringify(logs[i][0]),
    };
    tempLogs.push(log);
  }
  if (Array.isArray(warns)) {
    for (let i = 0; i < warns.length; i++) {
      if (warns[i].length > 0) {
        let warn = {
          createdAt: date,
          level: 'warn',
          content: JSON.stringify(warns[i][0]),
        };
        tempLogs.push(warn);
      }
    }
  }
  if (Array.isArray(errors)) {
    for (let i = 0; i < errors.length; i++) {
      let error = {
        createdAt: date,
        level: 'error',
        content: errors[i],
      };
      tempLogs.push(error);
    }
  }
  return {
    executionId: uuidv4(),
    rootCodeFunctionId: uuidv4(),
    sandbox: true,
    type: transactionType,
    authorizationApproved: null,
    logs: tempLogs,
    smsCount: 0,
    emailCount: 0,
    pushNotificationCount: 0,
    createdAt: date,
    startedAt: date,
    completedAt: date,
    updatedAt: date,
  };
};

export const run = async function (
  transaction: Transaction,
  code: string,
  environmentvariables: string,
  sandbox?: Sandbox,
): Promise<Array<ExecutionItem>> {
  const beforeTransactionScript =
    '(async () => { \n' +
    code +
    "\n if (typeof beforeTransaction === 'function') { " +
    '\n let before = await beforeTransaction(authInput);\n if (before === false) {return false;} else { return true} }' +
    ' return true})()';
  const afterTransactionScript =
    '(async () => { \n' +
    code +
    "\n if (typeof afterTransaction === 'function') { " +
    '\n let after = await afterTransaction(authInput);\n return after} return false})()';
  const afterDeclineScript =
    '(async () => { \n' +
    code +
    "\n if (typeof afterDecline === 'function') { " +
    '\n let after = await afterDecline(authInput);' +
    '\n return after}' +
    ' return false})()';

  const env = JSON.parse(environmentvariables);

  // Use the supplied sandbox, or create (and own) one for this run. The
  // emulator depends only on the Sandbox interface, so the execution engine
  // can be swapped without touching this function or its callers.
  const ownSandbox = sandbox ?? new IsolatedVmSandbox();

  // Captured console output and errors for each of the two phases.
  const sb = { logs: Array<any>(), warns: Array<any>(), errors: Array<any>() };
  const sb2 = { logs: Array<any>(), warns: Array<any>(), errors: Array<any>() };

  try {
    const first = await ownSandbox.run(
      beforeTransactionScript,
      env,
      transaction,
    );
    sb.logs = first.logs;
    if (first.error) {
      sb.errors.push(first.error);
    }
    let results = first.value;

    let second = afterTransactionScript;
    let secondTransaction = TransactionType.AfterTransaction;
    if (!results) {
      second = afterDeclineScript;
      secondTransaction = TransactionType.AfterDecline;
    }

    const secondResult = await ownSandbox.run(second, env, transaction);
    sb2.logs = secondResult.logs;
    if (secondResult.error) {
      sb2.errors.push(secondResult.error);
    }

    const executionItems = [];
    executionItems.push(
      createExecutionItem(
        TransactionType.BeforeTransaction,
        transaction.dateTime,
        sb.logs,
        sb.warns,
        sb.errors,
      ),
    );

    executionItems.push(
      createExecutionItem(
        secondTransaction,
        transaction.dateTime,
        sb2.logs,
        sb2.warns,
        sb2.errors,
      ),
    );

    return executionItems;
  } finally {
    // Only dispose a sandbox we created; a caller-supplied one is theirs to
    // manage (and reuse across runs).
    if (sandbox === undefined) {
      ownSandbox.dispose();
    }
  }
};
