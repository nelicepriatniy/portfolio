export default async function handler(req, res) {
  const ip = getClientIp(req);
  const userAgent = req.headers['user-agent'] ?? 'unknown';

  // Берём HTTPS-friendly сервис
  const geoRes = await fetch(`https://ipwho.is/${ip}`);
  const geo = await geoRes.json();           // { success, country, city, isp, ... }

  // Если запрос неуспешен — заполним «неизвестно»
  const country = geo.success ? geo.country  : 'unknown';
  const city    = geo.success ? geo.city     : 'unknown';
  const isp     = geo.success ? geo.isp      : 'unknown';

  const message = `
🔍 Новый визит
IP: ${ip}
🌍 Страна: ${country}
🏙️ Город: ${city}
📡 Провайдер: ${isp}
🖥️ UA: ${userAgent}
`.trim();

  const botToken = '7519536315:AAEhQX-LgrNO5-uHAXkxjnVzGmQ6M0qyAsM';
  const chatId = '-4547412724';

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  res.status(200).json({ status: 'ok' });
}

/* ---------- helpers ---------- */
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  if (req.headers['x-nf-client-connection-ip'])
    return req.headers['x-nf-client-connection-ip'];
  if (req.headers['cf-connecting-ip'])
    return req.headers['cf-connecting-ip'];
  return req.socket.remoteAddress;
}
