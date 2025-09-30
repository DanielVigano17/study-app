"use server"

import { HeaderLandingPage as Header } from "./_components/header-landing-page";
import { Blur } from "@/components/blur/Blur";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, CheckCircle, Shield, Sparkles, BookOpen, Target, Clock, Users, Quote } from "lucide-react";
import Image from "next/image";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ReviewsLandingPage } from "./_components/reviews-landing-page";
import { PricingSection } from "./_components/pricing-section";
import ParallaxBackground from "@/components/backgrounds/parallax-background";
import { getPriceId } from "@/config/stripe-products";
import Link from "next/link";

export default async function Home() {

  const priceId : string = getPriceId("basic", "monthly");

  const redirectTo = encodeURIComponent(`/continue-checkout?priceId=${priceId}`);
  
  const url = `/login?redirectTo=${redirectTo}`;

  return (
    <div className="relative h-fit">
      <ParallaxBackground dotColor="#d1d1d1" dotSize={2} dotCount={400} speed={0.15} />
      <Header/>
      <Blur className="fixed top-0 left-0 opacity-15 blur-2xl z-20 w-36 md:w-72" />
      <Blur className="fixed bottom-0 right-0 opacity-15 blur-2xl z-20 w-36 md:w-72" />
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
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mb-12 leading-relaxed">
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
              <Link href={url}>
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
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
        <section id="app-print" className="w-full scroll-mt-24 z-30">
          <div className="max-w-full px-2 md:max-w-7xl mx-auto">
            {/* Container para a imagem */}
            <div className="relative">
              {/* Espaço para a imagem */}
              <div className="relative flex items-center w-full mx-auto justify-center bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100 p-1">
                <ShineBorder shineColor={["#3b82f6", "#3b82f6", "#3b82f6"]} />
                <Image src="/app-print.png" alt="SmartStudy" width={1470} height={992} className="rounded-[6px]" />
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
            O que dizem {" "}
            <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
              nossos Estudantes
            </AuroraText>
              </h2>
            <p className="text-lg text-gray-600 mb-12">Resultados reais de quem já usa o SmartStudy</p>
              <ReviewsLandingPage/>
          </div>
        </section>

        {/* Planos e preços */}
        <section id="pricing" className="mt-24 px-4 scroll-mt-24">
          <PricingSection />
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
                <Link href={url}>Começar agora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="mt-24 h-24 border-t border-gray-200 px-4 text-sm text-gray-600 z-30 glass-card">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 h-full">
            <div className="font-bold">© {new Date().getFullYear()} SmartStudy. Todos os direitos reservados.</div>
          </div>
        </footer>

    </div>
  );
}
