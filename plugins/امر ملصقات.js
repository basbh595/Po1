import fetch from 'node-fetch';
import { Sticker } from 'wa-sticker-formatter';

let handler = async (m, { conn, args }) => {
    let sticker = false;
    try {
        let q = m.quoted  ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';
        let img = await q.download?.();
        if (/image|video/g.test(mime)) {
            sticker = await createSticker(img, mime);
        } else if (args[0] && isUrl(args[0])) {
            sticker = await createSticker(null, args[0]);
        } else {
            throw 'Reply to an image/video or provide a URL';
        }
    } catch (e) {
        console.error(e);
        sticker = 'Error converting to sticker';
    } finally {
        m.reply(sticker);
    }
};

handler.command = /^(sticker|stiker)$/i;
export default handler;

const isUrl = (text) => text.match(/https?:\/\/[^\s]+/);

async function createSticker(img, mimeOrUrl) {
    let metadata = { pack: 'Pack', author: 'Author', type: 'full' };
    return (new Sticker(img || mimeOrUrl, metadata)).toBuffer();
}
