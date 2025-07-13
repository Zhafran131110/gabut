const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Scan QR code untuk login...');
});

client.on('ready', () => {
    console.log('Client siap digunakan.');

    const groupId = "120363405726993984@g.us";

    const kirimPesanTiapMenit = async () => {
        const now = new Date();
        const target = new Date();
        target.setHours(7, 0, 0, 0); // jam 07:00 pagi

        // Kalau sudah lewat jam 07:00, hentikan pengiriman
        if (now >= target) {
            console.log("Sudah lewat jam 07:00. Bot berhenti mengirim pesan.");
            clearInterval(interval); // hentikan pengulangan
            return;
        }

        const selisihMs = target - now;
        const totalMenit = Math.floor(selisihMs / 60000);
        const jam = Math.floor(totalMenit / 60);
        const menit = totalMenit % 60;

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
    };

    // Kirim pertama kali saat bot siap
    kirimPesanTiapMenit();

    // Kirim ulang setiap 1 menit
    interval = setInterval(kirimPesanTiapMenit, 60 * 1000);
});

let interval;
client.initialize();


