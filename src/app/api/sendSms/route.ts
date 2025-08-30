import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, userPhone, reservationName, link, reservationType, message } =
      await req.json();

    const to = "+33744844063";
    const url = `https://api.unimtx.com/?action=sms.message.send&accessKeyId=${process.env.UNIMTX_ACCESS_KEY_ID}`;

    const body = {
      to,
      templateId: "4d6cfe9a",
      templateData: { name, userPhone, reservationName, link, reservationType },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
