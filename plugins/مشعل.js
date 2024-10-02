import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*• Example:* ${usedPrefix + command} hai`);
  
  try {
    const ppk = await zeta(text);
    await conn.sendMessage(m.chat, { text: ppk }, { quoted: m });
  } catch (error) {
    m.reply(`An error occurred: ${error.message}`);
  }
};

handler.help = ["zeta"];
handler.tags = ["ai"];
handler.command = ["zeta"];

export default handler;

async function zeta(text) {
  try {
    const request = await axios.post('https://vestia-zeta.vercel.app/api/chat', {
      prompt: text
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      }
    });

    const message = request.data.message.replace(/<\/?p>/g, '');

    return message;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch data from Zeta API');
  }
}
