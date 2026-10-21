"use server";

import { revalidatePath, refresh } from "next/cache";
import { requireWritableOrganization } from "@/lib/dal/assets";
import { reconcileClientSoa, requestClicksignSoaSignature } from "@/lib/dal/client-representation-documents";
import { validateSoaSignatureRequest } from "@/lib/clicksign/representation-documents";

export type SoaSignatureActionState = {
  message?: string;
  signerEmail?: string;
  status?: "error" | "success";
  representationStatus?: "already_signed" | "signature_requested";
};

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function requestSoaSignatureAction(
  _: SoaSignatureActionState,
  formData: FormData,
): Promise<SoaSignatureActionState> {
  const parsed = validateSoaSignatureRequest({
    fullName: getFormString(formData, "fullName"),
    email: getFormString(formData, "email"),
    cpf: getFormString(formData, "cpf"),
    maritalStatus: getFormString(formData, "maritalStatus"),
    address: getFormString(formData, "address"),
  });

  if (!parsed.ok) {
    return {
      status: "error",
      message: parsed.message,
    };
  }

  try {
    const { organizationId, userId } = await requireWritableOrganization();
    const result = await requestClicksignSoaSignature({
      organizationId,
      userId,
      data: parsed.data,
    });

    revalidatePath("/gallery");
    refresh();

    return {
      status: "success",
      signerEmail: result.document.signerEmail,
      representationStatus: result.status,
      message: result.message,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Nao foi possivel solicitar a assinatura do SOA agora.",
    };
  }
}

export async function verifySoaSignatureAction(): Promise<SoaSignatureActionState> {
  try {
    const { organizationId } = await requireWritableOrganization();
    const document = await reconcileClientSoa(organizationId);
    revalidatePath("/gallery");
    refresh();
    if (document?.status === "signed") {
      return { status: "success", representationStatus: "already_signed", message: "Assinatura confirmada. Volte para a galeria e confirme o envio das imagens novamente." };
    }
    if (document?.status === "cancelled" || document?.status === "rejected" || document?.status === "expired") {
      return { status: "error", message: "A solicitação não está mais ativa. Feche esta janela e confirme o envio novamente para solicitar uma nova assinatura." };
    }
    return { status: "error", message: "A assinatura ainda não foi concluída na Clicksign. Confira o e-mail recebido e tente novamente." };
  } catch (error) {
    console.error("soa_status_check_failed", error);
    return { status: "error", message: "Não foi possível verificar a assinatura na Clicksign agora. Tente novamente ou fale com o suporte." };
  }
}
