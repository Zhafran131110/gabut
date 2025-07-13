const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan QR Code...');
});

client.on('ready', async () => {
    console.log('Client is ready!');

    // Ganti dengan nama grup yang sesuai persis
    const groupName = "Nama Grup Kamu";

    // Cari grup dengan nama
    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name === groupName);

    if (!group) {
        console.log("Grup tidak ditemukan.");
        return;
    }

    const now = new Date();
    const target = new Date();

    target.setHours(7, 0, 0, 0); // jam 07:00 pagi

    // Jika sudah lewat jam 7, targetnya besok
    if (now >= target) {
        target.setDate(target.getDate() + 1);
    }

    const ms = target - now;
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const waktuStr =
        (hours > 0 ? `${hours} jam ` : "") +
        (minutes > 0 ? `${minutes} menit ` : "") +
        "lagi sekolah";

    await client.sendMessage(group.id._serialized, waktuStr);
    console.log("Pesan terkirim:", waktuStr);
});

client.initialize();
