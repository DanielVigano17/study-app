// Variáveis carregadas via: dotenv -e .env.test (no script test:integration)
if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL não definida. Crie .env.test com DATABASE_URL e DIRECT_URL para rodar testes de integração."
  );
}
