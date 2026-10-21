import type { AdminCaseActionKind } from "./admin-case-workflow";

export type OperationalActionKind = Extract<AdminCaseActionKind, "follow_up" | "call" | "internal_note" | "register_payment" | "legal" | "close_resolved">;

export function validateOperationalAction(input: { kind: OperationalActionKind; notes: string; settlementAmount: number | null; paidAmount: number | null; hasSra: boolean; closed: boolean }): string | null {
  if (input.closed) return "Este caso já está encerrado.";
  if (input.kind !== "register_payment" && !input.notes.trim()) return "Informe a descrição da ação.";
  if (input.kind === "register_payment") {
    if (!input.hasSra || !input.settlementAmount || input.settlementAmount <= 0) return "É necessário um SRA e um acordo com valor definido.";
    if (!input.paidAmount || input.paidAmount < input.settlementAmount) return "O valor pago deve cobrir o valor integral do acordo.";
  }
  return null;
}

export function validateCaseOpen(stage: string, status: string): string | null {
  return stage === "closed" || status === "resolved" ? "Este caso já está encerrado." : null;
}
