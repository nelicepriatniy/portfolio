// src/app/api/sendVisit/route.js

export async function GET(req) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    "unknown";

  const userAgent = req.headers.get("user-agent");

  const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
  const geo = await geoRes.json();

  const message = `
🔍 Новый визит:
IP: ${ip}
🌍 Страна: ${geo.country}
🏙️ Город: ${geo.city}
📡 Провайдер: ${geo.isp}
🖥️ User-Agent: ${userAgent}
  `;

  const botToken = "7519536315:AAEhQX-LgrNO5-uHAXkxjnVzGmQ6M0qyAsM";
  const chatId = "-4547412724";

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  return Response.json({ status: "ok" });
}
