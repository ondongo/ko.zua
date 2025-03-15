import { NextResponse } from "next/server";

const YABETOO_PAY_API_URL = "https://buy.api.yabetoopay.com/v1/sessions";
const AUTHORIZATION_KEY =
  "pk_test_vFskqkVaezowyhpAuSgOhmNFDc3UCdYj0xyd5fPUROC8SrqBTDbpFyRq";
const ACCOUNT_ID = "acct_eEvf4vC0ZLR8qoQQoSeLYx2iIjaLCZbz9SP7";

export async function POST(req: Request) {
  try {
    const { successUrl, cancelUrl, total, user, lineItems } = await req.json();

    if (!total || !user || !lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { success: false, message: "Données invalides" },
        { status: 400 }
      );
    }

    // Calcul du montant à payer (50% du total)
    const depositAmount = (parseFloat(total) * 0.5).toFixed(2);

    // Création des items pour Yabetoo Pay
    const items = lineItems.map((item: any) => ({
      productId: "prod_Uj14EuwVb9qsqpoSxKbjxeZyIlRl11G6jc2Z", // À remplacer par l'ID réel
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
      accountId: ACCOUNT_ID,
    };

    const response = await fetch(YABETOO_PAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTHORIZATION_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Erreur API" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error);
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
