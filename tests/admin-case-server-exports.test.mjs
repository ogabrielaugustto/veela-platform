import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

test('case server action modules export only async runtime values', () => {
  for (const file of ['admin-cases-workflow.ts', 'admin-case-communications.ts', 'admin-case-sra.ts']) {
    const source = readFileSync(new URL(`../app/actions/${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /export\s+(?:const|let|var|function|class)\s/, `${file} exports a non-async runtime value`);
  }
});
