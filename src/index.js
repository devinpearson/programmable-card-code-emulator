const { v4: uuidv4 } = require("uuid");
const vm = require("vm");
const nodeFetch = require("node-fetch");
const momentMini = require("moment-mini");
const _ = require("lodash");

exports.createTransaction = function (
  currencyCode,
  centsAmount,
  merchantCode,
  merchantName,
  merchantCity,
  countryCode,
) {
  let date = new Date();
  date = date.toISOString();
  return {
    accountNumber: "10000000000",
    dateTime: date,
    centsAmount: centsAmount,
    currencyCode: currencyCode.toLowerCase(),
    type: "card",
    reference: "simulation",
    card: {
      id: "2280000",
    },
    merchant: {
      category: {
        code: merchantCode,
        key: "bakeries",
        name: "Bakeries",
      },
      name: merchantName,
      city: merchantCity,
      country: {
        code: countryCode.toUpperCase(),
        alpha3: "ZAF",
        name: "South Africa",
      },
    },
  };
};

exports.createExecutionItem = function (transactionType, date, logs) {
  let tempLogs = [];
  for (let i = 0; i < logs.length; i++) {
    let log = { createdAt: date, level: "info", content: logs[i][0] };
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

exports.run = async function (transaction, code, environmentvariables) {
  const beforeTransactionScript =
    "(async () => { \n" +
    code +
    "\n let before = await beforeTransaction(authInput);\n return before})()";
  const afterTransactionScript =
    "(async () => { \n" +
    code +
    "\n let before = await afterTransaction(authInput);\n return before})()";
  const afterDeclineScript =
    "(async () => { \n" +
    code +
    "\n let before = await afterDecline(authInput);\n return before})()";
  const sb = {
    process: { env: JSON.parse(environmentvariables) },
    authInput: transaction,
    console: {
      log: (...args) => {
        sb.logs.push(args);
        // console.log(...args);
      },
    },
    logs: [],
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
      log: (...args) => {
        sb2.logs.push(args);
        //console.log(...args);
      },
    },
    logs: [],
    fetch: nodeFetch,
    moment: momentMini,
    lodash: _,
  };
  let second = afterTransactionScript;
  let secondTransaction = "after_transaction";
  if (!results) {
    second = afterDeclineScript;
    secondTransaction = "after_decline";
  }
  let script2 = new vm.Script(second);
  let results2 = await script2.runInNewContext(sb2, {
    displayErrors: true,
  });

  let executionItems = [];
  executionItems.push(
    this.createExecutionItem(
      "before_transaction",
      transaction.dateTime,
      sb.logs,
    ),
  );

  executionItems.push(
    this.createExecutionItem(secondTransaction, transaction.dateTime, sb2.logs),
  );

  //  console.log(sb.logs)
  return executionItems;
};
