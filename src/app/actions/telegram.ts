'use server';

export async function sendTelegramNotification(data: {
  traffer: string,
  amount: string,
  geo: string,
  wallet: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const message = `
💰 **НОВАЯ ОПЛАТА YMC!** 💰

👤 **Траффер:** ${data.traffer}
🌍 **ГЕО:** ${data.geo}
💵 **Сумма:** ${data.amount}
💳 **Кошелек:** \`${data.wallet}\`

🚀 *Проверьте админку для деталей.*
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Telegram notification failed:', error);
  }
}