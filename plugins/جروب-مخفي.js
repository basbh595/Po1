import { generateWAMessageFromContent } from '@adiwajshing/baileys'

let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => conn.decodeJid(u.id))
    let msg = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: text || '' } }, { userJid: conn.user.id, mentions: users })
    await conn.relayMessage(m.chat, msg.message, {})
}

handler.help = ['hidetag']
handler.tags = ['group']
handler.command = /^(خفي|مهم|@)$/i
handler.group = true
handler.owner = true

export default handler
