const BOT_TOKEN = '7519536315:AAEhQX-LgrNO5-uHAXkxjnVzGmQ6M0qyAsM';
const CHAT_ID = '-4547412724';

exports.handler = async (event) => {
  // Динамический импорт node-fetch
  const fetch = (await import('node-fetch')).default;

  try {
    const { name, contact, message } = JSON.parse(event.body);

    // Проверяем наличие данных
    if (!name || !contact) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and contact are required fields.' }),
      };
    }

    // Формируем текст сообщения
    const text = `
      New Contact Request:
      - Name: ${name}
      - Contact: ${contact}
      - Message: ${message || 'No message provided'}
    `;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    // Проверка успешности отправки сообщения в Telegram
    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Telegram error: ${errorText}` }),
      };
    }

    // Успешный ответ
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent to Telegram' }),
    };
  } catch (error) {
    console.error('Error in sendToTelegram:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Server error: ${error.message}` }),
    };
  }
};
