import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v21.0/526824780520450/messages';
const ACCESS_TOKEN = 'EAAhFm8wkL5kBOZCauNhZAMKZCOPccFg3j8LRSr00OOUd46SKIaXJCXD4dWfLWsZAWBdKQ0ujYB19qTssSkoPGCP2iGRwIXVVGPYG27cCu4c0w4gSlh0pKj1ZBQVe4NYdFLV3SmgXdVkPWDLFB5To9kGwqnQpgFJbbIFdhhdvSr3ZAQNRVoUJZAg8fnMAhP1I4OM7uwzh259ZBK4pi0KZCcMf36VZBkukcZD';

export const sendWhatsAppMessage = async (req, res) => {
    try {
        const { phoneNumber, nombre, correo, contrasenia } = req.body;

        const response = await axios.post(
            WHATSAPP_API_URL,
            {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'template',
                template: {
                    name: 'msg_confirmacion',
                    language: { code: 'es_MX' },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                { type: 'text', text: nombre },
                                { type: 'text', text: correo },
                                { type: 'text', text: contrasenia }
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({
            success: true,
            message: 'Mensaje enviado correctamente',
            data: response.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al enviar el mensaje',
            error: error.response ? error.response.data : error.message
        });
    }
};