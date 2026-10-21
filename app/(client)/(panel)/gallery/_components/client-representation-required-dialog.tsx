"use client";

import { useActionState } from "react";
import { FileSignatureIcon, MailCheckIcon } from "lucide-react";
import {
  requestSoaSignatureAction,
  verifySoaSignatureAction,
  type SoaSignatureActionState,
} from "@/app/actions/client-representation-documents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  ClientRepresentationDefaults,
  ClientRepresentationUploadGate,
} from "@/lib/dal/client-representation-documents";

const initialState: SoaSignatureActionState = {};

type ClientRepresentationRequiredDialogProps = {
  defaults: ClientRepresentationDefaults;
  gate: ClientRepresentationUploadGate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ClientRepresentationRequiredDialog({
  defaults,
  gate,
  open,
  onOpenChange,
}: ClientRepresentationRequiredDialogProps) {
  const [state, action, pending] = useActionState(
    requestSoaSignatureAction,
    initialState,
  );
  const [verification, verify, verifying] = useActionState(verifySoaSignatureAction, initialState);
  const hasPendingRequest = gate.blockReason === "pending" && gate.document?.status === "signature_requested";
  const success = state.status === "success" || verification.status === "success";
  const signed = verification.status === "success" || state.representationStatus === "already_signed";
  const signerEmail = state.signerEmail ?? gate.document?.signerEmail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!success} className="max-h-[calc(100svh-2rem)] overflow-y-auto p-0 sm:max-w-2xl">
        <div className="border-b border-border bg-muted/35 px-6 py-5">
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-md border border-border bg-background shadow-sm">
              <FileSignatureIcon className="size-5 text-primary" aria-hidden="true" />
            </div>
            <DialogTitle>{success ? (signed ? "Assinatura confirmada" : "SOA enviado") : "Assinatura do SOA obrigatória"}</DialogTitle>
            <DialogDescription className={success ? "sr-only" : "max-w-xl leading-6"}>
              {success ? "Resultado da solicitação de assinatura." : "Antes de iniciar o monitoramento da primeira imagem, precisamos que você assine a representação da Direito na Lente pela Clicksign."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {success ? (
          <div className="space-y-5 px-6 py-5">
            <div className="flex items-start gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
              <MailCheckIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>{signed ? "Assinatura confirmada. Volte para a galeria e confirme o envio das imagens novamente." : `Enviamos o SOA pela Clicksign para ${signerEmail}. Depois da assinatura, volte para a galeria e confirme o envio das imagens novamente.`}</p>
            </div>
            <div className="flex justify-end"><Button type="button" onClick={() => onOpenChange(false)}>Fechar</Button></div>
          </div>
        ) : hasPendingRequest ? (
          <form action={verify} className="space-y-5 px-6 py-5">
            <p className="text-sm leading-6">O SOA foi enviado para {gate.document?.signerEmail}. Após assinar, verifique a assinatura e confirme o envio das imagens novamente.</p>
            {verification.message ? <FieldError>{verification.message}</FieldError> : null}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={verifying}>Fechar</Button>
              <Button type="submit" disabled={verifying}>{verifying ? "Verificando..." : "Já assinei — verificar"}</Button>
            </div>
          </form>
        ) : (
        <form action={action} className="space-y-5 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="soa-full-name">Nome completo</Label>
              <Input
                id="soa-full-name"
                name="fullName"
                defaultValue={defaults.fullName ?? ""}
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soa-email">E-mail para assinatura</Label>
              <Input
                id="soa-email"
                name="email"
                type="email"
                defaultValue={defaults.email ?? ""}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soa-cpf">CPF</Label>
              <Input
                id="soa-cpf"
                name="cpf"
                defaultValue={defaults.cpf ?? ""}
                inputMode="numeric"
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soa-marital-status">Estado civil</Label>
              <Input
                id="soa-marital-status"
                name="maritalStatus"
                placeholder="solteiro, casada, divorciada..."
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soa-address">Endereco completo</Label>
            <Textarea
              id="soa-address"
              name="address"
              defaultValue={defaults.address ?? ""}
              rows={4}
              required
            />
          </div>

          {state.status === "error" && state.message ? (
            <FieldError>{state.message}</FieldError>
          ) : null}

          <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={pending}
            >
              Voltar para galeria
            </Button>
            <Button type="submit" disabled={pending || success}>
              <FileSignatureIcon className="size-4" aria-hidden="true" />
              {pending ? "Enviando..." : "Solicitar assinatura"}
            </Button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
