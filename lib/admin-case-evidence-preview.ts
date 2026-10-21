type EvidencePreviewSources = {
  storedImage: string | null | undefined;
  screenshot: string | null | undefined;
  externalImage: string | null | undefined;
};

export function getEvidencePreviewSources(sources: EvidencePreviewSources): string[] {
  return [...new Set([sources.storedImage, sources.screenshot, sources.externalImage].filter(
    (url): url is string => Boolean(url),
  ))];
}
