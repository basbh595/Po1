import axios from 'axios';
import uploadImage from '../lib/uploadImage.js';

const Zoro_API = 'https://zoro-foryou.vercel.app/api/img-to-url';

let handler = async (m) => {
  let q = m.quoted || m;
  let mime = (q.msg || q).mimetype || '';

    if (!mime) {
    throw '*[❗] یرجی الرد علی صوره*';
  }

  
  if (!mime.startsWith('image/')) {
    throw '*رد علي صوره فقط*';
  }

  let media = await q.download();

  try {
        let imageBase64 = media.toString('base64');

        const response = await axios.post(Zoro_API, {
      image: imageBase64
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

        if (response.data.status) {
      let imageLink = response.data.imageUrl;
      m.reply(`*✅ تست تم تحويل الصوره لرابط*\n *الرابط يبرووو:* ${imageLink}`);
    } else {
      m.reply(`⚠ حدث خطأ: ${response.data.message}`);
    }
  } catch (error) {

    m.reply(`⚠ حدث خطأ أثناء رفع الصورة:\n${error.message}`);
  }
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = ['لرابط'];

export default handler;
