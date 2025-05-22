export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  // Получим геолокацию через ip-api
  const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
  const geo = await geoRes.json();

  // Текст для отправки в Telegram
  const message = `
🔍 Новый визит:
IP: ${ip}
🌍 Страна: ${geo.country}
🏙️ Город: ${geo.city}
📡 Провайдер: ${geo.isp}
🖥️ User-Agent: ${userAgent}
  `;

  // Отправим в Telegram
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  res.status(200).json({ status: 'ok' });
}
