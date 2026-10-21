type Evidence = {
  captureStatus: string;
  screenshotUrl: string | null;
  matchedImageUrl: string | null;
};

export function hasCapturedScreenshot(evidence: Evidence | null | undefined): boolean {
  return evidence?.captureStatus === "captured" && Boolean(evidence.screenshotUrl);
}

export function getPageEvidenceCoverage(placements: Array<{ latestEvidence: Evidence | null }>) {
  if (!placements.length) return "pending" as const;
  const captured = placements.filter((placement) => hasCapturedScreenshot(placement.latestEvidence)).length;
  if (captured === placements.length) return "captured" as const;
  const hasImageOnly = placements.some(({ latestEvidence: evidence }) =>
    evidence?.captureStatus === "captured" && Boolean(evidence.matchedImageUrl),
  );
  if (captured || hasImageOnly) return "partial" as const;
  if (placements.some(({ latestEvidence: evidence }) =>
    !evidence || evidence.captureStatus === "pending" || evidence.captureStatus === "processing",
  )) return "pending" as const;
  return "failed" as const;
}
