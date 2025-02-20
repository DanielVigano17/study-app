import clientOpenAi from "@/lib/open-ai-client";

export default class AiService {

   static async gerarPergunta(){
    const completion = await clientOpenAi.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Escreva frases bonitas sobre o Santos Fc e a volta do Neymar.",
            },
        ],
        store: true,
    });

    console.log(completion.choices[0].message)
    return completion;
   }

}