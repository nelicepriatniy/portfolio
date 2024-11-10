// Начинаем с проверки наличия переменных окружения
const BOT_TOKEN = '7519536315:AAEhQX-LgrNO5-uHAXkxjnVzGmQ6M0qyAsM';
const CHAT_ID = '-4547412724';

// Проверка значений переменных окружения
if (!BOT_TOKEN || !CHAT_ID) {
  console.error("Ошибка: Переменные окружения BOT_TOKEN или CHAT_ID не определены.");
  throw new Error("Не удалось найти необходимые переменные окружения для Telegram API.");
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, contact, message } = req.body;

      // Проверка, что обязательные поля присутствуют
      if (!name || !contact) {
        console.error("Ошибка: Параметры 'name' или 'contact' отсутствуют.");
        return res.status(400).json({ error: "Отсутствуют обязательные поля: name или contact." });
      }

      const text = `👤 Name: ${name}\n📞 Contact: ${contact}\n📬 Message: ${message || "No message provided"}`;
      
      // URL для отправки запроса в Telegram
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      // Данные для отправки
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      });

      // Проверка на ошибки в ответе
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Ошибка отправки сообщения в Telegram:", errorMessage);
        return res.status(500).json({ error: "Ошибка при отправке сообщения в Telegram" });
      }

      // Успешный ответ
      return res.status(200).json({ message: "Сообщение успешно отправлено в Telegram" });

    } catch (error) {
      console.error("Неожиданная ошибка при отправке сообщения:", error);
      res.status(500).json({ error: "Неожиданная ошибка при отправке сообщения" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Метод не поддерживается. Используйте POST." });
  }
}
