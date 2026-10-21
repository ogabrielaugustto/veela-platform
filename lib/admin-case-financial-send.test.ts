import assert from "node:assert/strict";
import test from "node:test";
const { processFinancialCommunication } = await import(new URL("./admin-case-financial-send.ts", import.meta.url).href);

test("a failed provider call never finalizes the agreement", async () => {
  let finalized = false;
  const result = await processFinancialCommunication({ reserve: async () => "pending", send: async () => { throw new Error("timeout"); }, finalize: async () => { finalized = true; } });
  assert.equal(result, "send_uncertain");
  assert.equal(finalized, false);
});

test("an already recorded communication is not sent again", async () => {
  let sent = false;
  const result = await processFinancialCommunication({ reserve: async () => "sent", send: async () => { sent = true; }, finalize: async () => {} });
  assert.equal(result, "sent");
  assert.equal(sent, false);
});

test("a failed finalization reports that the send succeeded", async () => {
  const result = await processFinancialCommunication({ reserve: async () => "pending", send: async () => {}, finalize: async () => { throw new Error("database"); } });
  assert.equal(result, "record_pending");
});
