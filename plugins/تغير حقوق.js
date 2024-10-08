constConst {   الافتراضي:   {  الافتراضي:  { Image }  = في انتظار  الاستيراد ('node-webpmux'){ Image }  = في انتظار  الاستيراد ('node-webpmux'){ default: { Image }} = await import('node-webpmux')

letدع هاندلر = Async (m، {Conn، text }) => {.handler = async (m, { conn, text }) => {
   if (!m.quoted) throw 'هذا الأمر يخول لك ان تمسح حقوق اي ملصق يكفي فقط ان ترسل للبوت الملصق الذي سوف تحذف حقوقه ثم تشير له و تكتب هكذا  \n\n*.smeta*' 
 دع ستيكر = كاذب. let stiker = false
  حاول  { { try {
  دع  [packname، ...author] = text.split ('|') [packname، ...author] = text.split ('|') let [packname, ...author] = text.split('|')
   المؤلف =   (المؤلف ||  []).الانضمام ('|') (author || []).join('|')
  دع الميم = m.quoted.mimetype || " quoted.mimetype || " let mime = m.quoted.mimetype || ''
     if (!/webp/.test(mime)) throw 'المرجو الاشارة للملصق!' if (!/webp/.test(mime)) throw 'المرجو الاشارة للملصق!'
  دع IMG = انتظر m.quoted.download () . quoted.download () . let img = await m.quoted.download()
     if (!img) throw 'المرجو الاشارة للملصق!' if (!img) throw 'المرجو الاشارة للملصق!'
 ستيكر = addExif (img، packname || '، المؤلف || ") await addExif(img, packname || '', author || '')
 } الصيد (هـ) { } catch (e) {
  وحدة التحكم.خطأ (هـ) error(e)
 إذا (Buffer.isBuffer (e)) stiker = e if (Buffer.isBuffer(e)) stiker = e
 }  أخيرا  { } finally {
 إذا (مستر) conn.sendMessage (m.chat، { الملصق: stiker }، {  نقلت: m  }) if (stiker) conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
  رمي آخر  'وقع خطأ'. 'وقع خطأ'. else throw 'وقع خطأ'
 } }
}
Handler.Help = ["Smeta"]help = ["smeta"]
handler.tags = ["ملصق"]tags = ["sticker"]
handler.command = /^ (smeta) $/icommand = /^(smeta)$/i
تصدير معالج الافتراضي.default handler

asyncوظيفة async addExif (العازلة، اسم الحزمة، المؤلف، الفئات = ["]، إضافي = {}) {function addExif(buffer, packname, author, categories = [''], extra = {}) {
 Const IMG = صورة جديدة () جديدة () const img = new Image()
 Const JSON = { 'sticker-pack-id': 'parel-kntll', 'sticker-pack-name': packname, 'sticker-pack-publisher': المؤلف, 'emojis': الفئات, 'is-avatar-sticker': 1, ...extra } { 'sticker-pack-id': 'parel-kntll', 'sticker-pack-name': packname, 'sticker-pack-publisher': المؤلف, 'emojis': الفئات, 'is-avatar-sticker': 1, ...extra } const json = { 'sticker-pack-id': 'parel-kntll', 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, 'is-avatar-sticker': 1, ...extra }
 دع exifAttr = Buffer.from ([0x49، 0x49، 0x2A، 0x00، 0x08، 0x00"، 0x41، 0x57، 0x07، 0x00"، 0x00، 0x16، 0x00]) from ([0x49، 0x49، 0x2A، 0x00، 0x08، 0x00"، 0x41، 0x57، 0x07، 0x00"، 0x00، 0x16، 0x00]) let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
  let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
  let exif = Buffer.concat([exifAttr, jsonBuffer])
 exif. writeUIntLE(jsonBuffer.length, 14, 4)
  await img.load(buffer)
  img.exif = exif
  return await img.save(null)
          }
