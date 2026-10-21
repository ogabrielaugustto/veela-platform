export async function processFinancialCommunication(steps: {
  reserve: () => Promise<"pending" | "sent">;
  send: () => Promise<void>;
  finalize: () => Promise<void>;
}): Promise<"sent" | "send_uncertain" | "record_pending"> {
  const reservation = await steps.reserve();
  if (reservation === "sent") return "sent";
  try {
    await steps.send();
  } catch (error) {
    console.error("Falha ao enviar comunicação financeira", error);
    return "send_uncertain";
  }
  try {
    await steps.finalize();
  } catch (error) {
    console.error("Falha ao finalizar comunicação financeira", error);
    return "record_pending";
  }
  return "sent";
}
