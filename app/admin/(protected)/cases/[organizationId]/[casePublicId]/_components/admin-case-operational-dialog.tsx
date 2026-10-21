"use client";

import { initialAdminCaseActionState } from "@/lib/admin-case-action-state";

import { useActionState, useState } from "react";
import { executeOperationalCaseAction } from "@/app/actions/admin-cases-workflow";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADMIN_CASE_ACTION_LABELS, type AdminCaseActionKind } from "@/lib/admin-case-workflow";

type Props = {
  action: AdminCaseActionKind;
  organizationId: string;
  casePublicId: number;
  onClose: () => void;
};

export function AdminCaseOperationalDialog({ action, organizationId, casePublicId, onClose }: Props) {
  const [state, formAction, pending] = useActionState(executeOperationalCaseAction, initialAdminCaseActionState);
  const payment = action === "register_payment";
  const [fields, setFields] = useState({ paidAmount: "", paidAt: "", paymentMethod: "", paymentReference: "", notes: "" });
  function updateField(name: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open && !pending) onClose(); }}>
      <DialogContent>
        <form action={formAction} onReset={(event) => event.preventDefault()} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{ADMIN_CASE_ACTION_LABELS[action]}</DialogTitle>
            <DialogDescription>Registre a ação no histórico do caso.</DialogDescription>
          </DialogHeader>
          <input type="hidden" name="organizationId" value={organizationId} />
          <input type="hidden" name="casePublicId" value={casePublicId} />
          <input type="hidden" name="actionKind" value={action} />
          {payment ? (
            <>
              <label className="grid gap-2 text-sm">
                Valor pago (R$)
                <Input name="paidAmount" value={fields.paidAmount} onChange={(event) => updateField("paidAmount", event.target.value)} inputMode="decimal" placeholder="1500,00" required />
              </label>
              <label className="grid gap-2 text-sm">
                Data do pagamento
                <Input name="paidAt" value={fields.paidAt} onChange={(event) => updateField("paidAt", event.target.value)} type="date" required />
              </label>
              <label className="grid gap-2 text-sm">
                Forma de pagamento
                <select name="paymentMethod" value={fields.paymentMethod} onChange={(event) => updateField("paymentMethod", event.target.value)} required className="h-9 rounded-md border bg-background px-3">
                  <option value="">Selecione</option>
                  <option value="pix">PIX</option>
                  <option value="boleto">Boleto</option>
                  <option value="transfer">Transferência</option>
                  <option value="other">Outra</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                Referência (opcional)
                <Input name="paymentReference" value={fields.paymentReference} onChange={(event) => updateField("paymentReference", event.target.value)} maxLength={180} />
              </label>
            </>
          ) : null}
          <label className="grid gap-2 text-sm">
            {payment ? "Observações (opcional)" : "Descrição / justificativa"}
            <Textarea name="notes" value={fields.notes} onChange={(event) => updateField("notes", event.target.value)} required={!payment} maxLength={4000} />
          </label>
          {state.message ? (
            <p role="status" className={state.status === "error" ? "text-sm text-destructive" : "text-sm text-emerald-700"}>
              {state.message}
            </p>
          ) : null}
          <DialogFooter>
            <Button type="button" variant="outline" disabled={pending} onClick={onClose}>
              {state.status === "success" ? "Fechar" : "Cancelar"}
            </Button>
            {state.status !== "success" ? (
              <Button disabled={pending} type="submit">{pending ? "Registrando..." : "Registrar ação"}</Button>
            ) : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

