import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = pkg;

// Configuración del cliente con LocalAuth
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'backend_platforms',
  }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

// Inicializar cliente de WhatsApp
client.initialize();

// Mostrar QR en formato gráfico en la terminal
client.on('qr', (qr) => {
  console.log('📱 Escanea el siguiente código QR para iniciar sesión:');
  qrcode.generate(qr, { small: true }); // Genera un QR escaneable en la terminal
});

// Cliente listo
client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp listo.');
});

// Fallo de autenticación
client.on('auth_failure', (msg) => {
  console.error('Fallo de autenticación:', msg);
});

// Desconexión y reconexión automática
client.on('disconnected', (reason) => {
  console.log('Cliente desconectado:', reason);
  console.log('🔄 Reintentando conexión...');
  client.initialize();
});

// Controlador para enviar mensajes de WhatsApp
export const sendWhatsAppMessage = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ message: 'Número y mensaje son requeridos.' });
    }

    await client.sendMessage(to, message);
    res.status(200).json({ message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('❌ Error al enviar el mensaje:', error);
    res.status(500).json({ message: 'Error al enviar el mensaje.', error });
  }
};

// Escuchar señales para detener el proceso manualmente
process.on('SIGINT', async () => {
  console.log('Deteniendo el cliente de WhatsApp...');
  await client.destroy();
  process.exit(0);
});
