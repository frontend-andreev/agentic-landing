import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  description: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    const msg = {
      to: 'andreevdaniil781@gmail.com',
      from: 'andreevdaniil781@gmail.com', // Используем ваш же email как отправитель
      subject: `Новая заявка от ${formData.name} - Agentic`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #4f46e5; margin-bottom: 20px; font-size: 24px;">
              Новая заявка с сайта Agentic
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Контактные данные:</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Имя:</strong> ${formData.name}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${formData.email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Описание задачи:</h3>
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #4f46e5;">
                <p style="margin: 0; color: #374151; line-height: 1.5;">${formData.description}</p>
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Заявка отправлена: ${new Date().toLocaleString('ru-RU', {
                timeZone: 'Europe/Moscow',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} (МСК)
            </p>
          </div>
        </div>
      `,
      text: `
        Новая заявка с сайта Agentic
        
        Имя: ${formData.name}
        Email: ${formData.email}
        
        Описание задачи:
        ${formData.description}
        
        Заявка отправлена: ${new Date().toLocaleString('ru-RU')}
      `
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}