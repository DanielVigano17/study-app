import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface MagicLinkEmailProps {
  magicLink: string;
  userEmail: string;
}

export default function MagicLinkEmail({ 
  magicLink = 'https://smartstudy.me/auth/callback', 
  userEmail = 'usuario@exemplo.com' 
}: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Acesse sua conta SmartStudy com um clique</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://smartstudy.me/smartstudy-icon.png"
              width="40"
              height="40"
              alt="SmartStudy"
              style={logo}
            />
            <Heading style={heading}>SmartStudy</Heading>
          </Section>
          
          <Section style={contentSection}>
            <Heading style={h1}>Acesse sua conta</Heading>
            <Text style={text}>
              Olá! Você solicitou acesso à sua conta SmartStudy. 
              Clique no botão abaixo para fazer login de forma segura:
            </Text>
            
            <Section style={buttonSection}>
              <Button style={button} href={magicLink}>
                Acessar SmartStudy
              </Button>
            </Section>
            
            <Text style={text}>
              Este link é válido por 24 horas e só pode ser usado uma vez.
            </Text>
            
            <Text style={smallText}>
              Se você não solicitou este acesso, pode ignorar este email com segurança.
            </Text>
            
            <Text style={linkText}>
              Ou copie e cole este link no seu navegador:
              <br />
              <Link href={magicLink} style={link}>
                {magicLink}
              </Link>
            </Text>
          </Section>
          
          <Section style={footerSection}>
            <Text style={footer}>
              © 2024 SmartStudy. Todos os direitos reservados.
              <br />
              Este email foi enviado para {userEmail}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Estilos CSS-in-JS
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '580px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const logoSection = {
  padding: '32px 40px 0',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
};

const contentSection = {
  padding: '32px 40px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px 0',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
  border: 'none',
  cursor: 'pointer',
};

const smallText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0',
};

const linkText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '24px 0 0 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};

const footerSection = {
  padding: '0 40px 32px',
  borderTop: '1px solid #e5e7eb',
  marginTop: '32px',
};

const footer = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0 0 0',
  textAlign: 'center' as const,
};
