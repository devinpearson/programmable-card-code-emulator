import validator from 'validator';
import { expect, test } from 'vitest';
import { createExecutionItem } from '../src/exec';
import { createTransaction, run } from '../src/index';

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
  const dateTime = new Date();
  const dateTimeIso = dateTime.toISOString();
  const executionItem = createExecutionItem('before_transaction', dateTimeIso, [
    ['sample log'],
  ]);
  expect(validator.isUUID(executionItem.executionId, 4)).toBe(true);
  expect(validator.isUUID(executionItem.rootCodeFunctionId, 4)).toBe(true);
  expect(executionItem.sandbox).toBe(true);
  expect(executionItem.type).toBe('before_transaction');
  expect(executionItem.authorizationApproved).toBe(null);
  expect(
    new Date(executionItem.logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
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
  const dateTime = new Date();

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
  expect(results[0].authorizationApproved).toBe(true);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
});

test('run vm with comment at end', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(true);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
});

test('run vm with no return in begin', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(true);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
});

test('run vm with false return on begin', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(false);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
});

test('run vm with no beforeTransaction', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(true);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results.length).toBe(2);
});

test('run vm with no afterTransaction', async () => {
  const dateTime = new Date();

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
  expect(results[0].authorizationApproved).toBe(true);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results.length).toBe(2);
});

test('run vm with no afterDecline', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(false);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe(JSON.stringify(transaction));
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('info');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results.length).toBe(2);
});

test('with error log', async () => {
  const dateTime = new Date();
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
  expect(results[0].authorizationApproved).toBe(false);
  expect(results[1].authorizationApproved).toBeNull();
  expect(
    new Date(results[0].completedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(
    new Date(results[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].emailCount).toBe(0);
  expect(validator.isUUID(results[0].executionId, 4)).toBe(true);
  expect(results[0].logs[0].content).toBe('ReferenceError: zar is not defined');
  expect(
    new Date(results[0].logs[0].createdAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].logs[0].level).toBe('error');
  expect(results[0].pushNotificationCount).toBe(0);
  expect(validator.isUUID(results[0].rootCodeFunctionId, 4)).toBe(true);
  expect(results[0].sandbox).toBe(true);
  expect(results[0].smsCount).toBe(0);
  expect(
    new Date(results[0].startedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results[0].type).toBe('before_transaction');
  expect(
    new Date(results[0].updatedAt).getTime() - dateTime.getTime(),
  ).toBeLessThan(2);
  expect(results.length).toBe(2);
});

test('moment is available in the sandbox', async () => {
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(moment('2020-01-02').year());
          return true;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].logs[0].content).toBe(JSON.stringify(2020));
});

test('fetch is available in the sandbox', async () => {
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(typeof fetch);
          return true;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].logs[0].content).toBe(JSON.stringify('function'));
});

test('env variables are exposed via process.env', async () => {
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log(process.env.secret);
          return true;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ secret: 'shhh' }),
  );
  expect(results[0].logs[0].content).toBe(JSON.stringify('shhh'));
});

test('sandbox is isolated from the host process', async () => {
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  // The built-in Node `vm` module is not a security boundary: code like this
  // can reach the host's `process`. In a real isolate there is no host
  // `process.exit`, `require`, or module graph to reach, so these are
  // undefined rather than live host references.
  const code = `const beforeTransaction = async (authorization) => {
          console.log(typeof process.exit);
          console.log(typeof process.mainModule);
          console.log(typeof require);
          return true;
        };
        `;
  const results = await run(
    transaction,
    code,
    JSON.stringify({ test: 'value' }),
  );
  expect(results[0].logs[0].content).toBe(JSON.stringify('undefined'));
  expect(results[0].logs[1].content).toBe(JSON.stringify('undefined'));
  expect(results[0].logs[2].content).toBe(JSON.stringify('undefined'));
});

test('a supplied sandbox is reused and not disposed by run', async () => {
  const { IsolatedVmSandbox } = await import('../src/index');
  const transaction = createTransaction(
    'ZAR',
    1000,
    '0000',
    'Test Merchant',
    'Test City',
    'ZAF',
  );
  const code = `const beforeTransaction = async (authorization) => {
          console.log('hello');
          return true;
        };
        `;
  const sandbox = new IsolatedVmSandbox();
  const first = await run(transaction, code, JSON.stringify({}), sandbox);
  const second = await run(transaction, code, JSON.stringify({}), sandbox);
  expect(first[0].logs[0].content).toBe(JSON.stringify('hello'));
  expect(second[0].logs[0].content).toBe(JSON.stringify('hello'));
  sandbox.dispose();
});

import http from 'node:http';
import { IsolatedVmSandbox } from '../src/index';

const txn = () =>
  createTransaction('ZAR', 1000, '0000', 'Test Merchant', 'Test City', 'ZAF');

test('console.warn and console.error are captured at their levels', async () => {
  const code = `const beforeTransaction = async (a) => {
        console.log('an info');
        console.warn('a warning');
        console.error('an error');
        return true;
      };`;
  const results = await run(txn(), code, JSON.stringify({}));
  const entries = results[0].logs;
  expect(entries.find((l) => l.level === 'info').content).toBe(
    JSON.stringify('an info'),
  );
  expect(entries.find((l) => l.level === 'warn').content).toBe(
    JSON.stringify('a warning'),
  );
  expect(entries.find((l) => l.level === 'error').content).toBe(
    JSON.stringify('an error'),
  );
});

test('logging a BigInt does not crash the sandbox', async () => {
  const code = `const beforeTransaction = async (a) => {
        console.log(10n);
        return true;
      };`;
  const results = await run(txn(), code, JSON.stringify({}));
  expect(results[0].logs[0].content).toBe(JSON.stringify('10'));
});

test('a CPU-bound infinite loop is terminated by the timeout', async () => {
  const sandbox = new IsolatedVmSandbox({ timeoutMs: 300 });
  const code = `const beforeTransaction = async (a) => { while (true) {} };`;
  const results = await run(txn(), code, JSON.stringify({}), sandbox);
  const errorLog = results[0].logs.find((l) => l.level === 'error');
  expect(errorLog).toBeDefined();
  expect(errorLog.content.toLowerCase()).toContain('timed out');
  sandbox.dispose();
});

test('a non-CPU hang times out and the sandbox recovers for reuse', async () => {
  const sandbox = new IsolatedVmSandbox({ timeoutMs: 200 });
  const hang = `const beforeTransaction = async (a) => { await new Promise(() => {}); };`;
  const first = await run(txn(), hang, JSON.stringify({}), sandbox);
  expect(
    first[0].logs.find((l) => l.level === 'error').content.toLowerCase(),
  ).toContain('timed out');

  // The hang disposed the isolate; the next run must transparently rebuild.
  const ok = `const beforeTransaction = async (a) => { console.log('alive'); return true; };`;
  const second = await run(txn(), ok, JSON.stringify({}), sandbox);
  expect(second[0].logs[0].content).toBe(JSON.stringify('alive'));
  sandbox.dispose();
});

test('fetch reaches a local server', async () => {
  const server = http.createServer((_req, res) => {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ pong: true }));
  });
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  try {
    const code = `const beforeTransaction = async (a) => {
          const res = await fetch('http://127.0.0.1:${port}/');
          const body = await res.json();
          console.log(res.status);
          console.log(body.pong);
          return true;
        };`;
    const results = await run(txn(), code, JSON.stringify({}));
    const contents = results[0].logs.map((l) => l.content);
    expect(contents).toContain(JSON.stringify(200));
    expect(contents).toContain(JSON.stringify(true));
  } finally {
    server.close();
  }
});

test('invalid environment variables JSON throws a clear error', async () => {
  await expect(run(txn(), 'const x = 1;', 'not json')).rejects.toThrow(
    /Invalid environment variables JSON/,
  );
});

test('exposes Symbol.dispose and tolerates repeated disposal', () => {
  const sandbox = new IsolatedVmSandbox();
  expect(typeof sandbox[Symbol.dispose]).toBe('function');
  sandbox[Symbol.dispose]();
  sandbox.dispose();
});

test('disposing a non-standard thrown value still reports an error', async () => {
  const code = `const beforeTransaction = async (a) => { throw 'boom'; };`;
  const results = await run(txn(), code, JSON.stringify({}));
  const errorLog = results[0].logs.find((l) => l.level === 'error');
  expect(errorLog).toBeDefined();
  expect(errorLog.content).toContain('boom');
});

const startServer = async (handler) => {
  const server = http.createServer(handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const close = () => {
    server.closeAllConnections();
    return new Promise((resolve) => server.close(resolve));
  };
  return { url: `http://127.0.0.1:${port}/`, close };
};

const waitFor = async (check, timeoutMs = 2000) => {
  const deadline = Date.now() + timeoutMs;
  while (!check()) {
    if (Date.now() > deadline) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return true;
};

test('all console arguments are kept, space-separated', async () => {
  const code = `const beforeTransaction = async (a) => {
        console.log('a', 'b', 3);
        console.warn('w', { x: 1 });
        console.error('e', true);
        return true;
      };`;
  const results = await run(txn(), code, JSON.stringify({}));
  const byLevel = (level) =>
    results[0].logs.find((l) => l.level === level).content;
  expect(byLevel('info')).toBe('"a" "b" 3');
  expect(byLevel('warn')).toBe('"w" {"x":1}');
  expect(byLevel('error')).toBe('"e" true');
});

test('a single-argument log is unchanged by multi-argument support', () => {
  const item = createExecutionItem('before_transaction', 'd', [[{ a: 1 }]]);
  expect(item.logs[0].content).toBe(JSON.stringify({ a: 1 }));
});

test('fetch rejects a response larger than maxResponseBytes, even if card code asks for no limit', async () => {
  const server = await startServer((_req, res) => res.end('x'.repeat(4096)));
  const sandbox = new IsolatedVmSandbox({ maxResponseBytes: 1024 });
  try {
    const code = `const beforeTransaction = async (a) => {
          try {
            await (await fetch('${server.url}', { size: 0 })).text();
            console.log('read');
          } catch (e) {
            console.log('rejected');
          }
          return true;
        };`;
    const results = await run(txn(), code, JSON.stringify({}), sandbox);
    expect(results[0].logs[0].content).toBe(JSON.stringify('rejected'));
  } finally {
    sandbox.dispose();
    await server.close();
  }
});

test('a response under maxResponseBytes is read normally', async () => {
  const server = await startServer((_req, res) => res.end('small'));
  const sandbox = new IsolatedVmSandbox({ maxResponseBytes: 1024 });
  try {
    const code = `const beforeTransaction = async (a) => {
          console.log(await (await fetch('${server.url}')).text());
          return true;
        };`;
    const results = await run(txn(), code, JSON.stringify({}), sandbox);
    expect(results[0].logs[0].content).toBe(JSON.stringify('small'));
  } finally {
    sandbox.dispose();
    await server.close();
  }
});

test('an in-flight fetch is aborted when the run times out', async () => {
  let requestClosed = false;
  // Never responds; records when the client gives up on the request.
  const server = await startServer((req) => {
    req.on('close', () => {
      requestClosed = true;
    });
  });
  const sandbox = new IsolatedVmSandbox({ timeoutMs: 200 });
  try {
    const code = `const beforeTransaction = async (a) => {
          await fetch('${server.url}');
          return true;
        };`;
    const results = await run(txn(), code, JSON.stringify({}), sandbox);
    expect(
      results[0].logs.find((l) => l.level === 'error').content.toLowerCase(),
    ).toContain('timed out');
    expect(await waitFor(() => requestClosed)).toBe(true);
  } finally {
    sandbox.dispose();
    await server.close();
  }
});

test('an un-awaited fetch still completes after a normal run', async () => {
  let received = false;
  const server = await startServer((_req, res) => {
    received = true;
    res.end('ok');
  });
  try {
    const code = `const afterTransaction = async (t) => {
          fetch('${server.url}');
        };`;
    await run(txn(), code, JSON.stringify({}));
    expect(await waitFor(() => received)).toBe(true);
  } finally {
    await server.close();
  }
});
