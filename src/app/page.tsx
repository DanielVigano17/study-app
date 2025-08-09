"use server"

import { HeaderLandingPage as Header } from "./_components/header-landing-page";
import { Blur } from "@/components/blur/Blur";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, CheckCircle, Shield, Sparkles, BookOpen, Target, Clock, Users, Quote } from "lucide-react";
import Image from "next/image";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ReviewsLandingPage } from "./_components/reviews-landing-page";

export default async function Home() {
  return (
    <div className="relative h-fit">
      <DotPattern className="opacity-50 h-full w-full -z-50"/>
      <Header/>
      <Blur className="fixed top-0 left-0 w-72 opacity-15 blur-2xl z-20" />
      <Blur className="fixed bottom-0 right-0 w-72 opacity-15 blur-2xl z-20" />
      <main className="container mx-auto mt-24 flex flex-col">
        <section id="hero" className="flex flex-col items-center w-full text-center p-4 scroll-mt-24 z-30">
          {/* Badge de destaque */}
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Revolucione sua forma de estudar com IA</span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme seus estudos com
            <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
              {" "}Inteligência Artificial
            </AuroraText>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
            Crie flashcards inteligentes, questionários adaptativos e acompanhe seu progresso 
            com ferramentas avançadas de IA. Estude de forma mais eficiente e inteligente.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="#app-print">
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 text-lg font-semibold rounded-sm transition-all duration-300"
              asChild
            >
              <a href="#features">
                <Play className="mr-2 w-5 h-5" />
                Ver Recursos
              </a>
            </Button>
          </div>
        </section>

        {/* Seção para imagem da tela do software */}
        <section id="app-print" className="w-full px-4 scroll-mt-24 z-30">
          <div className="max-w-7xl mx-auto">
            {/* Container para a imagem */}
            <div className="relative">
              {/* Espaço para a imagem */}
              <div className="relative flex items-center w-5/6 mx-auto justify-center bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100 p-8">
                <ShineBorder shineColor={["#3b82f6", "#3b82f6", "#3b82f6"]} />
                <Image src="/app-print.png" alt="SmartStudy" width={1200} height={720} className="rounded-[6px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="flex flex-col mt-24 items-center w-full text-center p-4 scroll-mt-24 z-30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Recursos que {" "}
              <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
                Transformam 
              </AuroraText>
              {" "}o seu Estudo
            </h2>

            <p className="text-xl mx-auto md:text-lg text-gray-600 max-w-3xl mb-12 leading-relaxed">
              Ferramentas poderosas projetadas para estudantes que valorizam seu tempo
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><Sparkles className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Flashcards com IA</h3>
                <p className="text-gray-600">Gere flashcards a partir de textos e PDFs em segundos.</p>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-green-100 text-green-600 flex items-center justify-center mb-4"><Target className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Questionários Adaptativos</h3>
                <p className="text-gray-600">Teste seu conhecimento com níveis que se ajustam a você.</p>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mb-4"><Clock className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Revisões Otimizadas</h3>
                <p className="text-gray-600">Use espaçamento inteligente para fixar conteúdo na memória.</p>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center mb-4"><BookOpen className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Organização por Matérias</h3>
                <p className="text-gray-600">Mantenha tudo organizado por tema, curso e dificuldade.</p>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center mb-4"><Users className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Estudo Colaborativo</h3>
                <p className="text-gray-600">Compartilhe conteúdos com amigos e estude em grupo.</p>
              </div>
              <div className="rounded-xl border bg-white/60 backdrop-blur p-6">
                <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center mb-4"><Shield className="w-5 h-5"/></div>
                <h3 className="text-xl font-semibold mb-2">Segurança e Privacidade</h3>
                <p className="text-gray-600">Seus dados são protegidos e somente você decide o que compartilhar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="how-it-works" className="mt-24 px-4 scroll-mt-24 z-30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Como funciona {" "}
              <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
                {" "}
                SmartStudy
              </AuroraText>
            </h2>
            <p className="text-lg text-gray-600 mb-12">Três passos simples para turbinar seus estudos</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="rounded-xl border bg-white p-6">
                <div className="text-blue-600 font-bold text-sm mb-2">Passo 1</div>
                <h3 className="text-xl font-semibold mb-2">Importe seu material</h3>
                <p className="text-gray-600">Faça upload de textos, PDFs ou cole conteúdo que você quer estudar.</p>
              </div>
              <div className="rounded-xl border bg-white p-6">
                <div className="text-blue-600 font-bold text-sm mb-2">Passo 2</div>
                <h3 className="text-xl font-semibold mb-2">Gere conteúdos com IA</h3>
                <p className="text-gray-600">Crie flashcards e questionários automaticamente, prontos para revisar.</p>
              </div>
              <div className="rounded-xl border bg-white p-6">
                <div className="text-blue-600 font-bold text-sm mb-2">Passo 3</div>
                <h3 className="text-xl font-semibold mb-2">Estude e acompanhe</h3>
                <p className="text-gray-600">Revise com espaçamento inteligente e monitore seu progresso.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="testimonials" className="mt-24 px-4 scroll-mt-24">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
            <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
              O que dizem nossos alunos
            </AuroraText>
              </h2>
            <p className="text-lg text-gray-600 mb-12">Resultados reais de quem já usa o SmartStudy</p>
              <ReviewsLandingPage/>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24 px-4 scroll-mt-24 z-30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">Perguntas frequentes</h2>
            <div className="space-y-4">
              <details className="group rounded-xl border bg-white p-5 open:shadow">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between">
                  Como funciona a geração de flashcards com IA?
                  <CheckCircle className="w-5 h-5 text-blue-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-600">Você envia seu material e nossa IA extrai conceitos-chave para criar flashcards precisos em segundos.</p>
              </details>
              <details className="group rounded-xl border bg-white p-5 open:shadow">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between">
                  Preciso pagar para usar?
                  <CheckCircle className="w-5 h-5 text-blue-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-600">Você pode começar gratuitamente. Planos pagos oferecem limites maiores e recursos avançados.</p>
              </details>
              <details className="group rounded-xl border bg-white p-5 open:shadow">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between">
                  Meus dados estão seguros?
                  <CheckCircle className="w-5 h-5 text-blue-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-600">Sim. Utilizamos boas práticas de segurança e você controla o que deseja compartilhar.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section id="final-cta" className="mt-24 px-4 scroll-mt-24 z-30">
          <div className="max-w-4xl mx-auto rounded-2xl border bg-gradient-to-r from-blue-600 to-blue-500 text-white p-10 text-center">
            <h3 className="text-3xl font-bold mb-3">Pronto para transformar seus estudos?</h3>
            <p className="opacity-90 mb-8">Junte-se a milhares de alunos estudando melhor com IA.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <a href="#app-print">Começar agora</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="#faq">Tirar dúvidas</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="mt-24 mb-12 px-4 text-sm text-gray-600 z-30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="opacity-80">© {new Date().getFullYear()} SmartStudy. Todos os direitos reservados.</div>
            <nav className="flex items-center gap-4">
              <a href="#hero" className="hover:text-gray-900">Início</a>
              <a href="#features" className="hover:text-gray-900">Recursos</a>
              <a href="#how-it-works" className="hover:text-gray-900">Como funciona</a>
              <a href="#testimonials" className="hover:text-gray-900">Depoimentos</a>
              <a href="#faq" className="hover:text-gray-900">FAQ</a>
            </nav>
          </div>
        </footer>

      </main>
    </div>
  );
}
