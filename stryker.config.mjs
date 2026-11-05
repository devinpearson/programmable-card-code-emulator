// @ts-check
/**
 * Stryker mutation testing configuration.
 *
 * Mutation is scoped to the hand-written logic. The large generated lookup
 * tables (country.ts, currency.ts, merchant-category.ts) are data, not logic:
 * mutating them produces thousands of meaningless mutants and would make a run
 * take far too long, so they are deliberately excluded.
 *
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
export default {
  testRunner: 'vitest',
  coverageAnalysis: 'perTest',
  reporters: ['html', 'clear-text', 'progress'],
  mutate: ['src/exec.ts', 'src/isolated-vm-sandbox.ts', 'src/transaction.ts'],
  // Mutation score gates. `break` is left off so a run never fails CI by
  // itself; this is a quality signal run on demand, not a required check.
  thresholds: {
    high: 80,
    low: 60,
    break: null,
  },
};
