import { createTransaction, run } from '../src/index';
import { createExecutionItem } from '../src/exec';
import validator from 'validator';
import { test, expect } from 'vitest';

test('create a transaction', () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZA',
  );
  expect(transaction.accountNumber).toBe('10000000000');
  expect(transaction.card.id).toBe('2280000');
  expect(transaction.centsAmount).toBe(1000);
  expect(transaction.currencyCode).toBe('zar');
  expect(transaction.dateTime).toBeDefined();
  expect(transaction.merchant.category.code).toBe('0000');
  expect(transaction.merchant.category.key).toBe('unknown_category');
  expect(transaction.merchant.category.name).toBe('Unknown Category');
  expect(transaction.merchant.city).toBe('Test City');
  expect(transaction.merchant.country.code).toBe('ZA');
  expect(transaction.merchant.country.alpha3).toBe('ZAF');
  expect(transaction.merchant.country.name).toBe('South Africa');
  expect(transaction.merchant.name).toBe('Test Merchant');
  expect(transaction.reference).toBe('simulation');
  expect(transaction.type).toBe('card');
});

test('create execution item', () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const executionItem = createExecutionItem('before_transaction', dateTime, [
    ['sample log'],
  ]);
  expect(validator.isUUID(executionItem.executionId, 4)).toBe(true);
  expect(validator.isUUID(executionItem.rootCodeFunctionId, 4)).toBe(true);
  expect(executionItem.sandbox).toBe(true);
  expect(executionItem.type).toBe('before_transaction');
  expect(executionItem.authorizationApproved).toBe(null);
  expect(executionItem.logs[0].createdAt).toBe(dateTime);
  expect(executionItem.logs[0].level).toBe('info');
  expect(executionItem.logs[0].content).toBe(JSON.stringify('sample log'));
});

test('invalid currency code', () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'TES',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZA',
  );

  expect(transaction.currencyCode).toBe('zzz');
});

test('valid merchant code', () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '7277',
    'Test Merchant',
    'Test City',
    'ZA',
  );

  expect(transaction.currencyCode).toBe('zar');
  expect(transaction.merchant.category.code).toBe('7277');
  expect(transaction.merchant.category.key).toBe('counseling_services');
  expect(transaction.merchant.category.name).toBe('Counseling Services');
});

test('run vm', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
        console.log(authorization);
        return true;
      };
      
      // This function runs after an approved transaction.
      const afterTransaction = async (transaction) => {
        //   console.log(transaction)
        console.log("afterTransaction");
      };
      
      // This function runs after a declined transaction
      const afterDecline = async (transaction) => {
        //   console.log(transaction)
        console.log("afterDecline");
      };
      `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
});

test('run vm with comment at end', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(authorization);
          return true;
        };
        
        // This function runs after an approved transaction.
        const afterTransaction = async (transaction) => {
          //   console.log(transaction)
          console.log("afterTransaction");
        };
        
        // This function runs after a declined transaction
        const afterDecline = async (transaction) => {
          //   console.log(transaction)
          console.log("afterDecline");
        };
        // testing as this use to crash
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
});

test('run vm with no return in begin', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(authorization);
        };
        
        // This function runs after an approved transaction.
        const afterTransaction = async (transaction) => {
          //   console.log(transaction)
          console.log("afterTransaction");
        };
        
        // This function runs after a declined transaction
        const afterDecline = async (transaction) => {
          //   console.log(transaction)
          console.log("afterDecline");
        };
        // testing as this use to crash
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
});

test('run vm with false return on begin', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(authorization);

          return false;
        };
        
        // This function runs after an approved transaction.
        const afterTransaction = async (transaction) => {
          //   console.log(transaction)
          console.log("afterTransaction");
        };
        
        // This function runs after a declined transaction
        const afterDecline = async (transaction) => {
          //   console.log(transaction)
          console.log("afterDecline");
        };
        // testing as this use to crash
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
});

test('run vm with no beforeTransaction', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `
      // This function runs after an approved transaction.
      const afterTransaction = async (transaction) => {
        //   console.log(transaction)
        console.log("afterTransaction");
      };
      
      `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  //   console.log(results);
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
  expect(results.length).toBe(2);
});

test('run vm with no afterTransaction', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(authorization);
          return true;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  //   console.log(results);
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
  expect(results.length).toBe(2);
});

test('run vm with no afterDecline', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(authorization);
          return false;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  //   console.log(results);
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
  expect(results.length).toBe(2);
});

test('with error log', async () => {
  let dateTime = new Date();
  dateTime = dateTime.toISOString();
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
            if (authorization.currencyCode == zar)
            return false;
          };
          `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  //   console.log(results);
  expect(results[0].authorizationApproved).toBeNull();
  expect(results[0].completedAt).toBe(dateTime);
  expect(results[0].createdAt).toBe(dateTime);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe('ReferenceError: zar is not defined');
  expect(results[0].logs[0].createdAt).toBe(dateTime);
  expect(results[0].logs[0].level).toBe('error');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(results[0].startedAt).toBe(dateTime);
  expect(results[0].type).toBe('before_transaction');
  expect(results[0].updatedAt).toBe(dateTime);
  expect(results.length).toBe(2);
});
