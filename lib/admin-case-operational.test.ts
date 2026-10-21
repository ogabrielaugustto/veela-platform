import test from "node:test";
import assert from "node:assert/strict";
const { validateOperationalAction } = await import(new URL("./admin-case-operational.ts", import.meta.url).href);

test("payment requires an existing agreement, SRA and full amount", () => {
  assert.ok(validateOperationalAction({ kind: "register_payment", notes: "", settlementAmount: 10000, paidAmount: 9999, hasSra: true, closed: false }));
  assert.ok(validateOperationalAction({ kind: "register_payment", notes: "", settlementAmount: null, paidAmount: 10000, hasSra: true, closed: false }));
  assert.equal(validateOperationalAction({ kind: "register_payment", notes: "", settlementAmount: 10000, paidAmount: 10000, hasSra: true, closed: false }), null);
});

test("internal actions require a description and closed cases reject mutations", () => {
  assert.ok(validateOperationalAction({ kind: "close_resolved", notes: " ", settlementAmount: null, paidAmount: null, hasSra: false, closed: false }));
  assert.ok(validateOperationalAction({ kind: "follow_up", notes: "Contato", settlementAmount: null, paidAmount: null, hasSra: false, closed: true }));
});

test("closed cases cannot start communications or signature requests", async () => {
  const { validateCaseOpen } = await import(new URL("./admin-case-operational.ts", import.meta.url).href);
  assert.equal(validateCaseOpen("closed", "open"), "Este caso já está encerrado.");
  assert.equal(validateCaseOpen("treatment", "resolved"), "Este caso já está encerrado.");
  assert.equal(validateCaseOpen("treatment", "open"), null);
});
