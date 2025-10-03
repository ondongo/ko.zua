import { NextResponse } from "next/server";
import { PartnerLeadController } from "@/controllers/PartnerLeadController";
import { PartnerLead, LeadActorType, LeadType } from "@prisma/client";
import { v4 as uuid } from "uuid";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

export async function POST(req: Request) {
  if (!BREVO_API_KEY) {
    return NextResponse.json(
      { message: "Clé API Brevo manquante" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    const phone = body.phone?.trim();
    const whatsapp = body.whatsapp?.trim();
    const email = body.email?.trim() || undefined;
    const note = body.note?.trim() || undefined;

    if (!phone || !whatsapp || !body.leadType) {
      return NextResponse.json(
        { message: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // Validation ActorType
    const actorType: LeadActorType =
      body.actorType?.toUpperCase() === "COMPANY" ? "COMPANY" : "INDIVIDUAL";

    // Validation LeadType
    const validLeadTypes: LeadType[] = [
      "RENT_VEHICLE",
      "SELL_VEHICLE",
      "RENT_ESTATE",
      "SELL_ESTATE",
    ];
    if (!validLeadTypes.includes(body.leadType?.toUpperCase())) {
      return NextResponse.json(
        { message: "leadType invalide" },
        { status: 400 }
      );
    }

    const leadType = body.leadType.toUpperCase() as LeadType;

    // 1. Création en DB
    const newLead = {
      id: uuid(),
      phone,
      whatsapp,
      email,
      note,
      actorType,
      leadType,
      status: "NEW",
      isSuper: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;

    await PartnerLeadController.createPartnerLead(newLead);

    const subject = `Nouveau Partenaire (${actorType}) – ${leadType} | Ko.Zua`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://ko-zua.vercel.app/_next/image?url=%2FKozua%20v3.png&w=3840&q=75" 
                 alt="Logo Kozua" 
                 style="max-width: 200px; height: auto;" />
          </div>

          <h2 style="color:#D79B25; text-align:center;">Nouvelle demande de partenariat</h2>
          <hr/>
          <p><strong>Type :</strong> ${
            actorType === "COMPANY" ? "Entreprise" : "Particulier"
          }</p>
          <p><strong>Intention :</strong> ${leadType
            .replace("_", " ")
            .toLowerCase()}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>WhatsApp :</strong> ${whatsapp}</p>
          ${email ? `<p><strong>Email :</strong> ${email}</p>` : ""}
          ${note ? `<p><strong>Note :</strong> ${note}</p>` : ""}
          <hr/>
        </body>
      </html>
    `;

    const emailData = {
      sender: { name: "Ko.Zua - Partenariats", email: "kozua2025@gmail.com" },
      to: [
        { email: "Kozuaautomobile@gmail.com", name: "Service Partenaires" },
        { email: "kozua2025@gmail.com", name: "Admin Ko.Zua" },
      ],
      subject,
      htmlContent: html,
    };

    // Envoi via Brevo
    const response = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Erreur Brevo:", errText);
      return NextResponse.json(
        { message: "Erreur d’envoi email", error: errText },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Lead créé et email envoyé" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Erreur PartnerLead API:", err);
    return NextResponse.json(
      { message: "Erreur serveur", error: err.message },
      { status: 500 }
    );
  }
}
