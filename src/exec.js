"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run =
  exports.createExecutionItem =
  exports.LogLevel =
  exports.TransactionType =
    void 0;
const { v4: uuidv4 } = require("uuid");
const vm = require("vm");
const nodeFetch = require("node-fetch");
const momentMini = require("moment-mini");
const _ = require("lodash");
var TransactionType;
(function (TransactionType) {
  TransactionType["BeforeTransaction"] = "before_transaction";
  TransactionType["AfterTransaction"] = "after_transaction";
  TransactionType["AfterDecline"] = "after_decline";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var LogLevel;
(function (LogLevel) {
  LogLevel["Info"] = "info";
  LogLevel["Warn"] = "warn";
  LogLevel["Error"] = "error";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const createExecutionItem = (transactionType, date, logs, warns, errors) => {
  let tempLogs = [];
  for (let i = 0; i < logs.length; i++) {
    let log = {
      createdAt: date,
      level: "info",
      content: JSON.stringify(logs[i][0]),
    };
    tempLogs.push(log);
  }
  if (Array.isArray(warns)) {
    for (let i = 0; i < warns.length; i++) {
      if (warns[i].length > 0) {
        let warn = {
          createdAt: date,
          level: "warn",
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
        level: "error",
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
exports.createExecutionItem = createExecutionItem;
const run = async function (transaction, code, environmentvariables) {
  const beforeTransactionScript =
    "(async () => { \n" +
    code +
    "\n if (typeof beforeTransaction === 'function') { " +
    "\n let before = await beforeTransaction(authInput);\n if (before === false) {return false;} else { return true} }" +
    " return true})()";
  const afterTransactionScript =
    "(async () => { \n" +
    code +
    "\n if (typeof afterTransaction === 'function') { " +
    "\n let after = await afterTransaction(authInput);\n return after} return false})()";
  const afterDeclineScript =
    "(async () => { \n" +
    code +
    "\n if (typeof afterDecline === 'function') { " +
    "\n let after = await afterDecline(authInput);" +
    "\n return after}" +
    " return false})()";
  const sb = {
    process: { env: JSON.parse(environmentvariables) },
    authInput: transaction,
    console: {
      log: (...args) => {
        sb.logs.push(args);
        // console.log(...args);
      },
    },
    logs: Array(),
    warns: Array(),
    errors: Array(),
    fetch: nodeFetch,
    moment: momentMini,
    lodash: _,
  };
  let results;
  try {
    let script = new vm.Script(beforeTransactionScript);
    results = await script.runInNewContext(sb, {
      displayErrors: false,
    });
  } catch (e) {
    sb.errors.push(e.toString());
  }
  const sb2 = {
    process: { env: JSON.parse(environmentvariables) },
    authInput: transaction,
    console: {
      log: (...args) => {
        sb2.logs.push(args);
        //console.log(...args);
      },
    },
    logs: Array(),
    warns: Array(),
    errors: Array(),
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
  try {
    let script2 = new vm.Script(second);
    results = await script2.runInNewContext(sb2, {
      displayErrors: false,
    });
  } catch (e) {
    sb2.errors.push(e.toString());
  }
  let executionItems = [];
  executionItems.push(
    (0, exports.createExecutionItem)(
      TransactionType.BeforeTransaction,
      transaction.dateTime,
      sb.logs,
      sb.warns,
      sb.errors,
    ),
  );
  executionItems.push(
    (0, exports.createExecutionItem)(
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
exports.run = run;
