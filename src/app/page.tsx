import ParallaxBackground from "@/components/backgrounds/parallax-background";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-screen flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-48">
      <ParallaxBackground dotColor="#d1d1d1" dotSize={2} dotCount={200} speed={0.15} />
      <div className="absolute inset-0 z-30">
        <div className="w-full h-full bg-gradient-radial from-blue-200/50 via-blue-100/30 to-transparent" />
      </div>
      <div className="container relative z-30 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl mx-auto">
          <div className="z-10 flex items-center justify-center opacity-0 animate-slideInLeft">
            <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
                >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Tecnologia de ponta para aprendizado</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
            <br />
            <div className="relative">
              <div className="absolute background">

              </div>
            <TextAnimate className="text-3xl break-words font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl" animation="blurInUp" by="word" as={"h1"} once>
              Estude de Forma Inteligente com IA e Repetição Espaçada!
            </TextAnimate>
            </div>
            <br />
            <TextAnimate className="text-muted-foreground text-gray-900 md:text-xl" duration={0.1} animation="blurInUp" by="word" as={"h1"} once>
              Domine qualquer assunto com flashcards personalizados, reforçados pela ciência da memorização e
              inteligência artificial. Acelere seu aprendizado e nunca mais esqueça o que realmente importa!
            </TextAnimate>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={"/login"}>
              <Button size="lg" className="px-8 opacity-0 animate-slideInLeft">
                Comece Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 opacity-0 animate-slideInLeft">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
