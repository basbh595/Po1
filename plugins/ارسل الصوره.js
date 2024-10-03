import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

let handler = async (m, { 
  conn, 
  usedPrefix, 
  command 
}) => {
  var q = m.quoted ? m.quoted : m;
  var mime = (q.msg || q).mimetype || q.mediaType || '';
  
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, "المرجو الانتظار قليلا لا تنسى ان تتابع \n instagram.com/noureddine_ouafy", m);
    try {
      const img = await q.download?.();
      let out = await uploadImage(img);
      let old = new Date();
      let res = await fetch(`https://api.betabotz.eu.org/api/maker/jadianime?url=${out}&apikey=❤️❤️❤️❤️`);
      let convert = await res.json();
      let buff = convert.result.img_crop_single;
      
      await conn.sendMessage(m.chat, {
        image: { url: buff },
        caption: `🍟 *استخراج البيانات* : ${((new Date() - old) * 1)} ms`
      }, { quoted: m });
      
    } catch (e) {
      console.log(e);
      throw(e);
    }
  } else {
    m.reply(`أرسل صورة مع الكابتشن *${usedPrefix + command}* أو قم بوضع علامة على الصورة التي تم إرسالها بالفعل`);
  }
};

handler.help = ['toanime'];
handler.command = ['toanime', 'jadianime'];
handler.tags = ['edit-image'];

export default handler;
