let handler = async (m, { conn, text, usedPrefix, command }) => { 
let cometido
cometido = `@${m.sender.split('@')[0]}`

if(!text && !m.quoted) return conn.reply(m.chat, `سوي منشن للي تبي تتزوجة او تتزوجية${usedPrefix + command}`, m)
if (text.length >= 1) {
} else if (m.quoted && m.quoted.sender) {
text = `@${m.quoted.sender.split('@')[0].replace('@', '')}`
} else if (m.quoted && m.quoted.fromMe) {
text = `${m.mentionedJid.map((user)=>(user === m.sender) ? text.replace('@', '') : `${user.split('@')[0].replace('@', '')}`).join(', ')}`
}
if (/[a-zA-Z]/.test(text) && !text.includes('@')) return conn.reply(m.chat, `*لا يمكن إلغاء وضع علامة على الرسالة ويمكنك فقط وضع علامة على الرسالة أو الرد عليها*`, m)
text = text.match(/[\d@]+/g).join('')

let coger = `  الف الف مبرووك صرتوا عريس وعروسة 😉 

${text} الف مبروووك يا عريس 🤵🏻‍♂

${cometido} الف مبرووك يا عروسة 👰🏻‍♀

كان معاكم الخطاب ذاك الامير 🤡


> 『🇾🇪🫀』`.trim()

await conn.reply(m.chat, coger, m, { mentions: [m.sender, text.replace('@', '') + '@s.whatsapp.net'] })
}

handler.command = /^(جوزني|عرس)$/i
export default handler
