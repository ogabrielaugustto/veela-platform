import { test } from "node:test";
import assert from "node:assert/strict";
import { getEvidencePreviewSources } from "../lib/admin-case-evidence-preview.ts";

test("prioriza imagens preservadas e captura antes da URL externa", () => {
  assert.deepEqual(getEvidencePreviewSources({ storedImage: null, screenshot: "/screenshot", externalImage: "https://example.com/page" }), ["/screenshot", "https://example.com/page"]);
  assert.deepEqual(getEvidencePreviewSources({ storedImage: "/image", screenshot: "/screenshot", externalImage: "/image" }), ["/image", "/screenshot"]);
});
