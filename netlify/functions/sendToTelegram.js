// netlify/functions/sendToTelegram.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Получаем данные из тела запроса
  const { message, name, contact } = JSON.parse(event.body);
  
  const botToken = '7519536315:AAEhQX-LgrNO5-uHAXkxjnVzGmQ6M0qyAsM'; // Убедитесь, что переменная правильно настроена
  const chatId = '-4547412724'; // Убедитесь, что переменная правильно настроена

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const textMessage = `
    New message from ${name}:
    Contact: ${contact}
    Message: ${message || 'No message'}
  `;

  const params = {
    chat_id: chatId,
    text: textMessage,
  };

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    // Проверяем успешность запроса к Telegram API
    if (data.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: data.description }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Server error' }),
    };
  }
};
