import { Transaction } from "./transaction";
const { v4: uuidv4 } = require("uuid");
const vm = require("vm");
const nodeFetch = require("node-fetch");
const momentMini = require("moment-mini");
const _ = require("lodash");

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
    BeforeTransaction = "before_transaction",
    AfterTransaction = "after_transaction",
    AfterDecline = "after_decline",
}

export const createExecutionItem = (transactionType: TransactionType, date: string, logs: any[]): ExecutionItem => {
    let tempLogs = [];
    for (let i = 0; i < logs.length; i++) {
      let log = {
        createdAt: date,
        level: "info",
        content: JSON.stringify(logs[i][0]),
      };
      tempLogs.push(log);
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
  
  export const run = async function (transaction: Transaction, code: string, environmentvariables: string) : Promise<Array<ExecutionItem>> {
    const beforeTransactionScript =
      "(async () => { \n" +
      code +
      "\n if (typeof beforeTransaction === 'function') { " +
      "\n let before = await beforeTransaction(authInput);\n if (before === false) {return false;} else { return true} } return true})()";
    const afterTransactionScript =
      "(async () => { \n" +
      code +
      "\n if (typeof afterTransaction === 'function') { " +
      "\n let after = await afterTransaction(authInput);\n return after} return false})()";
    const afterDeclineScript =
      "(async () => { \n" +
      code +
      "\n if (typeof afterDecline === 'function') { " +
      "\n let after = await afterDecline(authInput);\n return after} return false})()";
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
      fetch: nodeFetch,
      moment: momentMini,
      lodash: _,
    };
    let script = new vm.Script(beforeTransactionScript);
    let results = await script.runInNewContext(sb, {
      displayErrors: true,
    });
  
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
      fetch: nodeFetch,
      moment: momentMini,
      lodash: _,
    };
    let second = afterTransactionScript;
    let secondTransaction = TransactionType.AfterTransaction;
    if (!results) {
      second = afterDeclineScript;
      secondTransaction = TransactionType.AfterDecline;
    }
    let script2 = new vm.Script(second);
    await script2.runInNewContext(sb2, {
      displayErrors: true,
    });
  
    let executionItems = [];
    executionItems.push(
      createExecutionItem(
        TransactionType.BeforeTransaction,
        transaction.dateTime,
        sb.logs,
      ),
    );
  
    executionItems.push(
      createExecutionItem(secondTransaction, transaction.dateTime, sb2.logs),
    );
  
    //  console.log(sb.logs)
    return executionItems;
  };