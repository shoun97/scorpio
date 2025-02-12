import axios from "axios";

export const sendEmail = async (
  destinatarios: string[],
  template: string,
  subject: string,
) => {

  const emailConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    fromAddress: process.env.EMAIL_FROMADDRESS,
    fromName: process.env.EMAIL_FROMNAME,
    text: template,
  };

  for (const destinatario of destinatarios) {
    console.log(`Enviando correo de anulación de contratos a: ${destinatario}`);

    try {
      await axios.post(process.env.EMAIL_URI as string, {
        ...emailConfig,
        to: destinatario,
        subject,
        template,
      });
      console.log(`Correo enviado a: ${destinatario}`);
    } catch (error) {
      console.error(`Error enviando correo a ${destinatario}:`, error);
    }
  }
};
