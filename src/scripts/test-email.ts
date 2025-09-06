/**
 * Script de teste para o sistema de emails customizados
 * 
 * Execute com: npx tsx src/scripts/test-email.ts
 * 
 * Certifique-se de ter RESEND_API_KEY configurada no .env.local
 */

import { EmailService } from '../services/email-service';
import { render } from '@react-email/render';
import MagicLinkEmail from '../emails/magic-link-email';

async function testEmailSystem() {
  console.log('🧪 Iniciando testes do sistema de email...\n');

  // Teste 1: Verificar configuração
  console.log('1️⃣ Testando configuração...');
  const isConfigured = EmailService.isConfigured();
  const domainInfo = EmailService.getDomainInfo();
  
  console.log(`   ✅ Configurado: ${isConfigured ? 'SIM' : 'NÃO'}`);
  console.log(`   📧 Domínio: ${domainInfo.domain}`);
  console.log(`   📮 From: ${domainInfo.fromEmail}\n`);

  if (!isConfigured) {
    console.error('❌ RESEND_API_KEY não encontrada!');
    console.log('   Configure a variável de ambiente RESEND_API_KEY no .env.local');
    return;
  }

  // Teste 2: Renderizar template
  console.log('2️⃣ Testando renderização do template...');
  try {
    const testMagicLink = 'https://smartstudy.me/auth/callback?token=test123';
    const testEmail = 'teste@exemplo.com';
    
    const htmlContent = render(MagicLinkEmail({ 
      magicLink: testMagicLink, 
      userEmail: testEmail 
    }));
    
    console.log('   ✅ Template renderizado com sucesso');
    console.log(`   📏 Tamanho do HTML: ${htmlContent.length} caracteres\n`);
  } catch (error) {
    console.error('   ❌ Erro ao renderizar template:', error);
    return;
  }

  // Teste 3: Envio de email (opcional)
  const shouldSendTest = process.argv.includes('--send');
  
  if (shouldSendTest) {
    console.log('3️⃣ Testando envio de email...');
    const testEmail = process.argv.find(arg => arg.includes('@')) || 'seu-email@exemplo.com';
    
    if (testEmail === 'seu-email@exemplo.com') {
      console.log('   ⚠️  Para testar o envio, execute:');
      console.log('   npx tsx src/scripts/test-email.ts --send seu-email@dominio.com\n');
      return;
    }

    try {
      const result = await EmailService.sendMagicLinkEmail({
        to: testEmail,
        magicLink: 'https://smartstudy.me/auth/callback?token=test-' + Date.now(),
      });

      console.log('   ✅ Email enviado com sucesso!');
      console.log(`   📧 ID do email: ${result.emailId}`);
      console.log(`   📮 Enviado para: ${testEmail}\n`);
    } catch (error) {
      console.error('   ❌ Erro ao enviar email:', error);
      return;
    }
  } else {
    console.log('3️⃣ Teste de envio pulado (use --send para testar)\n');
  }

  console.log('🎉 Todos os testes passaram!');
  console.log('\n📋 Resumo:');
  console.log('   • Configuração: OK');
  console.log('   • Template: OK');
  console.log(`   • Envio: ${shouldSendTest ? 'TESTADO' : 'NÃO TESTADO'}`);
  console.log('\n🚀 Sistema pronto para produção!');
}

// Executar testes
testEmailSystem().catch((error) => {
  console.error('💥 Erro fatal nos testes:', error);
  process.exit(1);
});

export {};
