import OpenAI from 'openai';

const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default clientOpenAi;