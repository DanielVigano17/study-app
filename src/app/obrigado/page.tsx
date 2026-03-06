import { ApplicationPage } from "@/components/page-content/ApplicationPage";
import { auth } from "../../../auth/auth";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";
import ParallaxBackground from "@/components/backgrounds/parallax-background";
import { Blur } from "@/components/blur/Blur";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ObrigadoPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ 
    session_id?: string;
    success?: string;
    canceled?: string;
  }> 
}) {
  const session = await auth();
  const params = await searchParams;
  
  // Se não estiver logado, redirecionar para login
  if (!session?.user) {
    redirect("/login");
  }

  // Se cancelou o checkout, redirecionar para billing
  if (params.canceled === "true") {
    redirect("/app/billing");
  }

  return (
    <ApplicationPage pageKey="thank-you-page" authPage>
      <div className="min-h-full flex items-center justify-center">
        <ParallaxBackground dotColor="#d1d1d1" dotSize={2} dotCount={400} speed={0.15} />
        <Blur className="fixed top-0 left-0 opacity-15 blur-2xl z-20 w-36 md:w-72" />
        <Blur className="fixed bottom-0 right-0 opacity-15 blur-2xl z-20 w-36 md:w-72" />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header de Sucesso */}
          <div className="text-center space-y-6 mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Obrigado pela sua assinatura! 🎉
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Bem-vindo ao SmartStudy! Sua conta foi ativada com sucesso e você já pode 
                aproveitar os recursos da nossa plataforma.
              </p>
              <Button asChild>
                <Link href="/app">
                  Ir para o app
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ApplicationPage>
  );
}
