import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.facebook.com/v21.0/526824780520450/messages';
const ACCESS_TOKEN = 'EAAhFm8wkL5kBOwQGYKw0WQJaQg0Rr2yaL3EZAVRux0kjvGdU8aStRxbqQhQabgiZC3TMsZBnq5UDZBNjEZAruhaPR6jEoC3IojhZB0nZAxMZAN8uBHZAnvOtkcnn00fSZBP1KsedrwX6tHEAD9GIeMYsIcwpVddtBM5ey3ZAsZARAkvPLGOAbsV6fUkqKKVWxh5mqC4GtU097GM8jQZAulqnQYmzZAm5V9x3iu';

export const sendWhatsAppMessage = async (req, res) => {
    try {
        const { phoneNumber, accountName, email, password } = req.body;

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
                                { type: 'text', text: accountName },
                                { type: 'text', text: email },
                                { type: 'text', text: password },
                            ]
                        }
                    ]
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({
            success: true,
            message: 'Mensaje enviado correctamente',
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al enviar el mensaje',
            error: error.response ? error.response.data : error.message,
        });
    }
};
