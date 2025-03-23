import { NextResponse } from "next/server";

const YABETOO_PAY_API_URL = "https://buy.api.yabetoopay.com/v1/sessions";
const AUTHORIZATION_KEY =
  "sk_test_C4vQGL3LsPD1xPaf9orebaqxe2cbzVZgVMEHi0oPwQEfxbFaP8P4Kvzc";

export async function POST(req: Request) {
  try {
    const { successUrl, cancelUrl, total, user, lineItems } = await req.json();

    if (!total || !user || !lineItems || lineItems.length === 0) {
      return NextResponse.json({ success: false, message: "Données invalides" }, { status: 400 });
    }

    const depositAmount = (parseFloat(total) * 0.5).toFixed(2); // 50% du montant

    const items = lineItems.map((item: any) => ({
      productId: "prod_Uj14EuwVb9qsqpoSxKbjxeZyIlRl11G6jc2Z",
      quantity: item.quantity,
      price: item.unitPrice,
      productName: item.name,
    }));

    const body = {
      items,
      successUrl,
      cancelUrl,
      currency: "XFA",
      total: depositAmount,
      accountId: "acct_eEvf4vC0ZLR8qoQQoSeLYx2iIjaLCZbz9SP7",
    };

    console.log("Envoi des données à Yabetoo Pay :", JSON.stringify(body, null, 2));

    const response = await fetch(YABETOO_PAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTHORIZATION_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("Réponse de Yabetoo Pay :", data);

    if (response.ok) {
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: data.message || "Erreur API" }, { status: 400 });
    }
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error);
    return NextResponse.json({ success: false, message: "Erreur interne du serveur" }, { status: 500 });
  }
}

