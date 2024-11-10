const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("Ошибка: Переменные окружения BOT_TOKEN или CHAT_ID не определены.");
  throw new Error("Не удалось найти необходимые переменные окружения для Telegram API.");
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, contact, message } = req.body;

      if (!name || !contact) {
        console.error("Ошибка: Параметры 'name' или 'contact' отсутствуют.");
        return res.status(400).json({ error: "Отсутствуют обязательные поля: name или contact." });
      }

      const text = `👤 Name: ${name}\n📞 Contact: ${contact}\n📬 Message: ${message || "No message provided"}`;
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

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

      // Обрабатываем и проверяем ответ
      let responseData;
      try {
        responseData = await response.json();
      } catch (error) {
        const errorText = await response.text(); // Если ответ не JSON, то читаем текст
        console.error("Ошибка формата ответа от Telegram:", errorText);
        return res.status(500).json({ error: "Некорректный ответ от Telegram API", details: errorText });
      }

      // Проверяем статус ответа от Telegram
      if (!response.ok) {
        console.error("Ошибка отправки сообщения в Telegram:", responseData);
        return res.status(500).json({ error: "Ошибка при отправке сообщения в Telegram", details: responseData });
      }

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
