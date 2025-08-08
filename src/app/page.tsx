import { HeaderLandingPage as Header } from "./_components/header-landing-page";
import { Blur } from "@/components/blur/Blur";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      <Header/>
      <Blur className="fixed top-0 left-0 w-72 opacity-15 blur-2xl" />
      <Blur className="fixed bottom-0 right-0 w-72 opacity-15" />
      <main className="container mx-auto mt-24 h-screen flex flex-col items-center">
        <section className="flex flex-col items-center w-full h-screen text-center p-4">
          {/* Badge de destaque */}
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Revolucione sua forma de estudar com IA</span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme seus estudos com
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {" "}Inteligência Artificial
            </span>
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Gratuitamente
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Ver Demonstração
            </Button>
          </div>
        </section>

        {/* Seção para imagem da tela do software */}
        <section className="w-full py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Container para a imagem */}
            <div className="relative">
              {/* Background com blur */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl blur-3xl opacity-50"></div>
              
              {/* Espaço para a imagem */}
              <div className="relative flex items-center justify-center bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-8">
                <Image src="/app-print.png" alt="SmartStudy" width={1000} height={1000} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
