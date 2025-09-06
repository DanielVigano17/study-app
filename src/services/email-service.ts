import { Resend } from 'resend';
import { render } from '@react-email/render';
import MagicLinkEmail from '@/emails/magic-link-email';

// Inicializa o cliente Resend com a chave da API
const resend = new Resend(process.env.AUTH_RESEND_KEY);

interface SendMagicLinkEmailParams {
  to: string;
  magicLink: string;
  from?: string;
}

export class EmailService {
  /**
   * Envia email de magic link personalizado usando React Email e Resend
   */
  static async sendMagicLinkEmail({
    to,
    magicLink,
    from = 'SmartStudy <noreply@smartstudy.me>'
  }: SendMagicLinkEmailParams) {
    try {
      // Renderiza o template React Email para HTML
      const emailHtml = render(MagicLinkEmail({ 
        magicLink, 
        userEmail: to 
      }));

      // Renderiza o template para texto simples (fallback)
      const emailText = `
Olá!

Você solicitou acesso à sua conta SmartStudy.

Clique no link abaixo para fazer login:
${magicLink}

Este link é válido por 24 horas e só pode ser usado uma vez.

Se você não solicitou este acesso, pode ignorar este email com segurança.

---
SmartStudy
© 2024 SmartStudy. Todos os direitos reservados.
Este email foi enviado para ${to}
      `.trim();

      // Envia o email usando Resend
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject: 'Acesse sua conta SmartStudy',
        html: await emailHtml,
        text: emailText,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
        },
        tags: [
          {
            name: 'category',
            value: 'magic-link'
          },
          {
            name: 'environment',
            value: process.env.NODE_ENV || 'development'
          }
        ]
      });

      if (error) {
        console.error('Erro ao enviar email:', error);
        throw new Error(`Falha ao enviar email: ${error.message}`);
      }

      console.log('Email enviado com sucesso:', data?.id);
      return { success: true, emailId: data?.id };

    } catch (error) {
      console.error('Erro no serviço de email:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Erro desconhecido ao enviar email'
      );
    }
  }

  /**
   * Verifica se o serviço está configurado corretamente
   */
  static isConfigured(): boolean {
    return !!process.env.AUTH_RESEND_KEY;
  }

  /**
   * Obtém informações sobre o domínio configurado
   */
  static getDomainInfo() {
    return {
      configured: this.isConfigured(),
      domain: 'smartstudy.me',
      fromEmail: 'noreply@smartstudy.me'
    };
  }
}

export default EmailService;
