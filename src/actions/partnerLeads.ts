"use server";

import { PartnerLeadController } from "@/controllers/PartnerLeadController";
import { PartnerLead } from "@prisma/client";

export async function createPartnerLead(
  partnerLeadData: PartnerLead
): Promise<void> {
  await PartnerLeadController.createPartnerLead(partnerLeadData);
}
