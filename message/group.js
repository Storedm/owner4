const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))
module.exports = welcome = async (ikyy, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await ikyy.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await ikyy.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(ikyy.user.jid)) {
            ikyy.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(ikyy.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await ikyy.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
              let v = ikyy.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                teks = `halo @${num.split('@')[0]}\nselamat datang di group ${mdata.subject}`
	            buff = await getBuffer(pp_user)
		        ikyy.sendMessage(mdata.id, { contentText: `${teks}`, footerText: `bot by Julian Adriansyah`, buttons: [{buttonId: `!lll`,buttonText:{displayText: 'Welcome'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
		}
            if (anu.action == 'remove' && !mem.includes(ikyy.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await ikyy.groupMetadata(anu.jid)
            	num = anu.participants[0]
             let w = ikyy.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `goodbye @${num.split('@')[0]}`
                buff = await getBuffer(pp_user)
                ikyy.sendMessage(mdata.id, { contentText: `${out}`, footerText: `bot by Julian Adriansyah`, buttons: [{buttonId: `!ll`,buttonText:{displayText: 'Goodbye'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
