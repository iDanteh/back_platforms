import { Server } from 'socket.io';
import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const { Client, LocalAuth } = pkg;

let io;
let isAuthenticated = false;

export const initializeSocket = (serverInstance) => {
  io = new Server(serverInstance, {
      cors: {
          origin: '*', // Permitir conexiones desde cualquier origen
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      },
  }); // Inicializar socket.io con el servidor de Express
};

// Configuración del cliente con LocalAuth
const client = new Client({
  authStrategy: new LocalAuth({
      clientId: 'backend_platforms',
  }), 
  puppeteer: {
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--remote-debugging-port=9222'],
  }
  ,
});

// Inicializar cliente de WhatsApp
client.initialize();

// Mostrar QR en formato gráfico en la terminal
client.on('qr', (qr) => {
  // Solo emite el QR si no está autenticado
  if (!isAuthenticated) {
    console.log('📱 Escanea el siguiente código QR para iniciar sesión:');
    qrcode.generate(qr, { small: true }); // Genera un QR escaneable en la terminal

    if (io) {
      io.emit('qr', qr); // Emite el QR para que el frontend lo reciba
    }
  }
});

client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp listo.');
  isAuthenticated = true; // Marcar como autenticado
});

// Fallo de autenticación
client.on('auth_failure', (msg) => {
  console.error('Fallo de autenticación:', msg);
  isAuthenticated = false; 
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