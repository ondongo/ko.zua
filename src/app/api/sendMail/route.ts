import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { phone, name, email, vehicle, date, reservationType } =
        await req.json();
  
      if (!phone || !name || !vehicle || !date || !reservationType) {
        return new NextResponse(
          JSON.stringify({ message: "Données de réservation manquantes" }),
          { status: 400 }
        );
      }
  
      // Construction du message
      const message = `
        Réservation réussie :
        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone}
        Véhicule: ${vehicle.name}
        Date de début: ${new Date(date[0].startDate).toLocaleDateString()}
        Date de fin: ${new Date(date[0].endDate).toLocaleDateString()}
        Type de réservation: ${reservationType}
      `;
      const whatsappAPIUrl = `https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages`;
      const response = await fetch(whatsappAPIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_API_KEY_HERE`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone,
          text: { body: message },
        }),
      });
  
      if (!response.ok) {
        throw new Error(
          `Erreur lors de l'envoi du message WhatsApp: ${response.statusText}`
        );
      }
      return new NextResponse(
        JSON.stringify({ message: "Message envoyé avec succès" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      return new NextResponse(
        JSON.stringify({ message: "Erreur du serveur", error: error }),
        { status: 500 }
      );
    }
  }
  