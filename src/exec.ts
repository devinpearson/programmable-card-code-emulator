import type { Transaction } from './transaction.js';
import { v4 as uuidv4 } from 'uuid';
import vm from 'vm';
import nodeFetch from 'node-fetch';
import momentMini from 'moment-mini';

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
  const sb = {
    process: { env: JSON.parse(environmentvariables) },
    authInput: transaction,
    console: {
      log: (...args: any[]) => {
        sb.logs.push(args);
        // console.log(...args);
      },
    },
    logs: Array<any>(),
    warns: Array<any>(),
    errors: Array<any>(),
    fetch: nodeFetch,
    moment: momentMini,
  };
  let results;
  try {
    let script = new vm.Script(beforeTransactionScript);
    results = await script.runInNewContext(sb, {
      displayErrors: false,
    });
  } catch (e: any) {
    sb.errors.push(e.toString());
  }
  const sb2 = {
    process: { env: JSON.parse(environmentvariables) },
    authInput: transaction,
    console: {
      log: (...args: any[]) => {
        sb2.logs.push(args);
        //console.log(...args);
      },
    },
    logs: Array<any>(),
    warns: Array<any>(),
    errors: Array<any>(),
    fetch: nodeFetch,
    moment: momentMini,
  };
  let second = afterTransactionScript;
  let secondTransaction = TransactionType.AfterTransaction;
  if (!results) {
    second = afterDeclineScript;
    secondTransaction = TransactionType.AfterDecline;
  }

  try {
    let script2 = new vm.Script(second);
    results = await script2.runInNewContext(sb2, {
      displayErrors: false,
    });
  } catch (e: any) {
    sb2.errors.push(e.toString());
  }

  let executionItems = [];
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

  //  console.log(sb.logs)
  return executionItems;
};
