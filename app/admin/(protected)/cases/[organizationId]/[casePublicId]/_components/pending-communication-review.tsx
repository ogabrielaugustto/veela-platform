"use client";

import { initialAdminCaseCommunicationState } from "@/lib/admin-case-action-state";

import { useActionState, useState } from "react";
import { resolvePendingCaseCommunication } from "@/app/actions/admin-case-communications";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PendingCommunicationReview({ organizationId, casePublicId, eventId, action, to }: {
  organizationId: string; casePublicId: number; eventId: string; action: "negotiation" | "collections"; to: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [state, formAction, pending] = useActionState(resolvePendingCaseCommunication, initialAdminCaseCommunicationState);
  return (
    <Dialog>
      <DialogTrigger asChild><Button size="sm" variant="outline" className="mt-2">Conferir envio pendente</Button></DialogTrigger>
      <DialogContent>
        <form action={formAction} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Conferir envio pendente</DialogTitle>
            <DialogDescription>Verifique no provedor se a mensagem para {to} foi enviada. Escolha o resultado somente após essa conferência.</DialogDescription>
          </DialogHeader>
          <input type="hidden" name="organizationId" value={organizationId} />
          <input type="hidden" name="casePublicId" value={casePublicId} />
          <input type="hidden" name="eventId" value={eventId} />
          <input type="hidden" name="confirmed" value={confirmed ? "true" : "false"} />
          <label className="grid gap-2 text-sm">Resultado da conferência
            <select name="resolution" required className="h-9 rounded-md border bg-background px-3">
              <option value="">Selecione</option>
              <option value="sent">A mensagem foi enviada</option>
              <option value="not_sent">A mensagem não foi enviada</option>
            </select>
          </label>
          <label className="flex items-start gap-2 text-sm"><Checkbox checked={confirmed} onCheckedChange={(value) => setConfirmed(value === true)} /> Confirmei o resultado no provedor de e-mail.</label>
          {state.message ? <p role="status" className="text-sm">{state.message}</p> : null}
          <DialogFooter>
            {state.status !== "success" ? <Button disabled={!confirmed || pending} type="submit" onClick={() => sessionStorage.removeItem(`case-email:${organizationId}:${casePublicId}:${action}`)}>{pending ? "Registrando..." : "Registrar conferência"}</Button> : <Button type="button" onClick={() => { sessionStorage.removeItem(`case-email:${organizationId}:${casePublicId}:${action}`); window.location.reload(); }}>Concluir</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
