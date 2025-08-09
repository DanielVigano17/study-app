import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Pedro",
    username: "@pedrinho",
    body: "Como estudante de medicina, esse app revolucionou minha forma de estudar! A criação automática de flashcards com IA economiza horas do meu dia.",
    img: "https://avatar.vercel.sh/pedro",
  },
  {
    name: "Ana",
    username: "@aninha",
    body: "A repetição espaçada realmente funciona! Minhas notas melhoraram muito desde que comecei a usar. A IA ajuda a identificar exatamente quando devo revisar cada assunto.",
    img: "https://avatar.vercel.sh/ana",
  },
  {
    name: "Carlos",
    username: "@carlinho",
    body: "Fantástico como a IA organiza meu material de estudo! Ela separa os tópicos mais importantes e cria resumos personalizados. Perfeito para concursos!",
    img: "https://avatar.vercel.sh/carlos",
  },
  {
    name: "Mariana",
    username: "@mari",
    body: "Estudar para o mestrado ficou muito mais eficiente. A IA ajuda a criar conexões entre diferentes tópicos que eu nem tinha percebido antes!",
    img: "https://avatar.vercel.sh/mariana",
  },
  {
    name: "Rafael",
    username: "@rafa",
    body: "Os flashcards gerados pela IA são impressionantes! Eles pegam exatamente os pontos-chave da matéria. Minha preparação para o ENEM melhorou 100%.",
    img: "https://avatar.vercel.sh/rafael",
  },
  {
    name: "Julia",
    username: "@juju",
    body: "A organização automática do conteúdo é sensacional! A IA sabe exatamente quando preciso revisar cada tópico. Melhor método de estudo que já usei!",
    img: "https://avatar.vercel.sh/julia",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function ReviewsLandingPage() {
  return (
    <div className="relative flex h-fit w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] text-start">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] text-start">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
