const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan QR code untuk login...');
});

client.on('ready', async () => {
    console.log('Client siap digunakan.');

    // ID grup tujuan
    const groupId = "120363405726993984@g.us";

    // Hitung waktu sekarang hingga jam 07:00 pagi
    const now = new Date();
    const target = new Date();

    target.setHours(7, 0, 0, 0); // Set jam 7 pagi

    // Jika waktu sekarang sudah lewat jam 7, target adalah jam 7 besok
    if (now >= target) {
        target.setDate(target.getDate() + 1);
    }

    const selisihMs = target - now;
    const totalMenit = Math.floor(selisihMs / 60000);
    const jam = Math.floor(totalMenit / 60);
    const menit = totalMenit % 60;

    // Buat pesan
    const pesan =
        (jam > 0 ? `${jam} jam ` : "") +
        (menit > 0 ? `${menit} menit ` : "") +
        "lagi sekolah";

    try {
        await client.sendMessage(groupId, pesan);
        console.log("Pesan terkirim:", pesan);
    } catch (err) {
        console.error("Gagal mengirim pesan:", err);
    }
});

client.initialize();

