// src/app/api/sendToTelegram/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Проверяем, что botToken и chatId существуют
    if (!botToken || !chatId) {
      return NextResponse.json({ error: 'Bot token or chat ID not provided' }, { status: 400 });
    }

    // Проверяем наличие обязательных полей name и contact
    const { name, contact, message } = data;
    if (!name || !contact) {
      return NextResponse.json({ error: 'Name or contact is missing' }, { status: 400 });
    }

    // Формируем текст сообщения для отправки в Telegram
    let textMessage = `
      Новое сообщение с сайта:
      Имя: ${name}
      Контакт: ${contact}
    `;
    if (message) {
      textMessage += `\n💬 Сообщение: ${message}`;
    }

    // Отправляем запрос к Telegram API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMessage,
      }),
    });

    // Проверяем успешность запроса
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Failed to send message' }, { status: response.status });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
