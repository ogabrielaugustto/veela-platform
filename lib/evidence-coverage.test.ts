import test from "node:test";
import assert from "node:assert/strict";
const { getPageEvidenceCoverage, hasCapturedScreenshot } = await import(new URL("./evidence-coverage.ts", import.meta.url).href);

test("an image without a page screenshot is partial coverage", () => {
  const evidence = { captureStatus: "captured", screenshotUrl: null, matchedImageUrl: "/image" };
  assert.equal(hasCapturedScreenshot(evidence), false);
  assert.equal(getPageEvidenceCoverage([{ latestEvidence: evidence }]), "partial");
});

test("coverage is complete only when every occurrence has a screenshot", () => {
  const evidence = { captureStatus: "captured", screenshotUrl: "/screenshot", matchedImageUrl: null };
  assert.equal(hasCapturedScreenshot(evidence), true);
  assert.equal(getPageEvidenceCoverage([{ latestEvidence: evidence }]), "captured");
  assert.equal(getPageEvidenceCoverage([{ latestEvidence: evidence }, { latestEvidence: null }]), "partial");
  assert.equal(getPageEvidenceCoverage([{ latestEvidence: null }]), "pending");
  assert.equal(getPageEvidenceCoverage([{ latestEvidence: { ...evidence, captureStatus: "failed" } }]), "failed");
});
