"use client";

import { useState } from "react";

export function EvidencePreview({ sources, alt }: { sources: string[]; alt: string }) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const source = sources.find((url) => !failedSources.includes(url));

  if (!source) {
    return (
      <div className="flex h-72 items-center justify-center px-4 text-center text-sm text-muted-foreground">
        {sources.length === 0
          ? "Nenhuma evidência visual foi preservada ainda para este caso."
          : "Não foi possível carregar a imagem ou a captura da evidência."}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={source} alt={alt} className="h-72 w-full object-contain" onError={() => setFailedSources((failed) => [...failed, source])} />
  );
}
