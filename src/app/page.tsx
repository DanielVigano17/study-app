"use server"

import { HeaderLandingPage as Header } from "./_components/header-landing-page";
import { Blur } from "@/components/blur/Blur";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AuroraText } from "@/components/magicui/aurora-text";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default async function Home() {
  return (
    <div className="relative h-fit">
      <DotPattern className="opacity-50 h-full w-full -z-10"/>
      <Header/>
      <Blur className="fixed top-0 left-0 w-72 opacity-15 blur-2xl" />
      <Blur className="fixed bottom-0 right-0 w-72 opacity-15" />
      <main className="container mx-auto mt-24 flex flex-col">
        <section id="hero" className="flex flex-col items-center w-full text-center p-4 scroll-mt-24">
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
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Seção para imagem da tela do software */}
        <section id="app-print" className="w-full px-4 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            {/* Container para a imagem */}
            <div className="relative">
              {/* Espaço para a imagem */}
              <div className="relative flex items-center w-5/6 mx-auto justify-center bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100 p-8">
                <ShineBorder shineColor={["#3b82f6", "#3b82f6", "#3b82f6"]} />
                <Image src="/app-print.png" alt="SmartStudy" width={1000} height={1000} />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="flex flex-col mt-24 items-center w-full text-center p-4 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Recursos que {" "}
              <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
                Transformam 
              </AuroraText>
              {" "}o seu Estudo
            </h2>

            <p className="text-xl md:text-lg text-gray-600 max-w-3xl mb-12 leading-relaxed">
              Ferramentas poderosas projetadas para estudantes que valorizam seu tempo
            </p>

          </div>
        </section>

      </main>
    </div>
  );
}
