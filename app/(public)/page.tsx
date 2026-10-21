import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { formatPlanPrice } from "@/lib/billing/plans";
import { listBillingPlansFromDatabase } from "@/lib/dal/billing";

export const metadata: Metadata = {
  title: "Suas imagens merecem ser vistas. E respeitadas.",
  description: "Acompanhe onde suas imagens aparecem na web, revise ocorrências e conte com a Veela quando identificar um uso não autorizado.",
};

export const dynamic = "force-dynamic";

const steps = [
  { number: "01", title: "Adicione suas imagens", copy: "Reúna no painel as imagens que você quer acompanhar." },
  { number: "02", title: "Acompanhe as ocorrências", copy: "Veja onde elas foram encontradas e consulte o contexto disponível." },
  { number: "03", title: "Você decide", copy: "Reconheça usos autorizados ou sinalize os que precisam de atenção." },
  { number: "04", title: "Conte com a Veela", copy: "Usos não autorizados são encaminhados para acompanhamento da nossa equipe." },
];

const faqs = [
  { question: "Toda ocorrência encontrada é uma infração?", answer: "Não. Uma ocorrência indica que a imagem foi encontrada. Você revisa o contexto e informa se o uso é autorizado, deve ser ignorado ou não foi autorizado." },
  { question: "O que acontece quando identifico um uso não autorizado?", answer: "A ocorrência é encaminhada como caso para a equipe Veela, que acompanha os próximos passos." },
  { question: "Para quem a Veela foi feita?", answer: "Para fotógrafos, criadores, estúdios, agências e marcas que desejam acompanhar o uso de suas imagens." },
  { question: "Como começo?", answer: "Crie sua conta, escolha um plano disponível e cadastre suas imagens no painel." },
];

const primaryLink = "inline-flex items-center justify-center gap-8 rounded-full bg-[#293e51] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#405b70]";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em]";

export default async function LandingPage() {
  const pricingPlans = await listBillingPlansFromDatabase();

  return (
    <div className="overflow-hidden bg-[#f7f6f2] text-[#293e51]">
      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div className="max-w-3xl pb-3">
            <p className={`${eyebrow} mb-7 flex items-center gap-3`}><span className="h-2 w-2 rounded-full bg-[#e57857]" /> Monitoramento de imagens · revisão humana</p>
            <h1 className="font-heading text-[clamp(3.3rem,7vw,7rem)] font-medium leading-[0.98] tracking-[-0.065em]">Suas imagens vão longe.<br /><span className="text-[#8c9b9e]">Acompanhe até onde.</span></h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-[#5c6d75] sm:text-lg">Descubra onde suas imagens aparecem na web, identifique usos que você não autorizou e conte com a Veela para os próximos passos.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/auth/register" className={primaryLink}>Começar teste grátis <ArrowRight className="size-4" /></Link>
              <Link href="#como-funciona" className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#b6c0bd] underline-offset-8">Conheça a Veela <ArrowDownRight className="size-4" /></Link>
            </div>
            <p className="mt-8 text-xs text-[#778786]">Para quem cria, licencia e cuida de imagens.</p>
          </div>
          <div className="relative min-h-[410px] overflow-hidden bg-[#d7d8d0] sm:min-h-[530px]" role="img" aria-label="Fotografia editorial de montanhas, exemplo de imagem monitorada" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85')", backgroundPosition: "center", backgroundSize: "cover" }}>
            <div className="absolute inset-x-5 top-5 flex justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white"><span>Seu trabalho, no mundo</span><span>01 / 03</span></div>
            <div className="absolute bottom-5 left-5 right-5 bg-[#f9f8f4] p-5 shadow-xl sm:left-auto sm:w-72">
              <div className="flex items-center justify-between border-b border-[#d9dfdc] pb-3"><span className={`${eyebrow} text-[#71827f]`}>Exemplo ilustrativo</span><span className="h-2 w-2 rounded-full bg-[#e57857]" /></div>
              <p className="mt-4 font-heading text-xl">Uma imagem encontrada.</p><p className="mt-1 text-sm text-[#71827f]">Esse uso foi autorizado?</p>
              <div className="mt-5 flex gap-2 text-xs"><span className="rounded-full border border-[#b7c5c0] px-3 py-2">Sim, autorizado</span><span className="rounded-full bg-[#293e51] px-3 py-2 text-white">Não reconheço</span></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-b border-[#d4dad6] pb-5 text-xs text-[#75847f]"><span>Visibilidade para o seu trabalho.</span><span>Imagem ilustrativa · fotografia via Unsplash</span></div>
      </section>

      <section id="problema" className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.45fr_1fr] lg:px-12 lg:py-28">
        <p className={`${eyebrow} text-[#8a9994]`}>01 / O desafio</p>
        <div><h2 className="max-w-4xl font-heading text-4xl font-medium leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Você criou. Publicou. <span className="text-[#a3aeaa]">E depois?</span></h2><div className="mt-10 grid gap-8 border-t border-[#cfd7d2] pt-7 md:grid-cols-3"><p className="text-lg leading-7">Uma imagem pode aparecer em muitos lugares.</p><p className="text-lg leading-7">Nem todo uso vem com um aviso.</p><p className="text-lg leading-7">Acompanhar tudo manualmente toma tempo.</p></div></div>
      </section>

      <section className="bg-[#dce5df] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1344px] gap-10 md:grid-cols-[0.7fr_1fr] md:items-center"><div><p className={`${eyebrow} text-[#6e837b]`}>O valor da criação</p><p className="mt-5 font-heading text-[clamp(5rem,12vw,10rem)] leading-none tracking-[-0.08em]">93%</p></div><div><p className="max-w-2xl font-heading text-2xl leading-tight tracking-tight sm:text-4xl">dos europeus consideram importante que criadores possam proteger seus direitos e receber pelo seu trabalho.</p><a href="https://www.euipo.europa.eu/en/publications/ip-perception-study-2023" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 text-xs font-semibold">Fonte: EUIPO, estudo de percepção de propriedade intelectual, 2023 <ArrowUpRight className="size-3" /></a></div></div></section>

      <section id="como-funciona" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32"><div className="grid gap-6 lg:grid-cols-[0.45fr_1fr]"><p className={`${eyebrow} text-[#8a9994]`}>02 / Como funciona</p><div><h2 className="max-w-3xl font-heading text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-6xl">Mais clareza sobre onde seu trabalho aparece.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#708078]">Da imagem à decisão, tudo em um só lugar.</p></div></div><div className="mt-14 grid border-t border-[#cfd7d2] md:grid-cols-2 lg:grid-cols-4">{steps.map((step) => <div key={step.number} className="border-b border-[#cfd7d2] py-7 pr-8 lg:border-b-0 lg:border-r lg:pl-7 lg:first:pl-0 lg:last:border-r-0"><span className="text-xs text-[#99aaa1]">{step.number} /</span><h3 className="mt-10 font-heading text-2xl tracking-tight">{step.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#718078]">{step.copy}</p></div>)}</div></section>

      <section className="bg-[#293e51] px-5 py-20 text-[#f5f5ef] sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1344px] gap-12 lg:grid-cols-2 lg:items-center"><div className="relative min-h-[380px] bg-[#71847c] sm:min-h-[500px]" role="img" aria-label="Fotografia editorial de uma câmera, representando o trabalho de criadores" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=85')", backgroundPosition: "center", backgroundSize: "cover" }}><span className="absolute bottom-5 left-5 bg-[#f7f6f2] px-4 py-3 text-xs font-semibold text-[#293e51]">Criar é só o começo. ↗</span></div><div className="lg:pl-12"><p className={`${eyebrow} text-[#a9bdb7]`}>03 / Feita para quem cria</p><h2 className="mt-7 font-heading text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-6xl">Seu olhar tem valor. Seu tempo também.</h2><p className="mt-7 max-w-md text-base leading-7 text-white/65">Fotógrafos, estúdios, agências e marcas: acompanhem seus acervos sem transformar cada busca em uma nova jornada.</p><div className="mt-10 flex flex-wrap gap-2 text-xs text-white/80">{["Fotografia", "Campanhas", "Produtos", "Conteúdo autoral"].map(item => <span key={item} className="rounded-full border border-white/25 px-4 py-2">{item}</span>)}</div></div></div></section>

      <section id="planos" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className={`${eyebrow} text-[#8a9994]`}>04 / Planos</p><h2 className="mt-5 font-heading text-4xl font-medium tracking-[-0.05em] sm:text-6xl">Comece pelo seu acervo.</h2></div><Link href="/contato" className="inline-flex items-center gap-2 border-b border-current pb-1 text-sm font-semibold">Precisa de algo diferente? Fale conosco <ArrowUpRight className="size-4" /></Link></div><div className="mt-12 grid border-t border-[#cfd7d2] md:grid-cols-3">{pricingPlans.map(plan => <div key={plan.code} className="flex flex-col border-b border-[#cfd7d2] py-8 pr-8 md:border-b-0 md:border-r md:pl-8 md:first:pl-0 md:last:border-r-0"><div className="flex justify-between gap-3"><h3 className="font-heading text-2xl">{plan.name}</h3>{plan.isComingSoon && <span className="text-xs text-[#718078]">Em breve</span>}</div><p className="mt-8 font-heading text-4xl tracking-tight">{formatPlanPrice(plan.priceCents)}</p>{!plan.isComingSoon && <p className="mt-1 text-xs text-[#718078]">por mês</p>}<p className="mt-5 flex-1 text-sm leading-6 text-[#718078]">{plan.description}</p><Link href={plan.isSelectable ? `/auth/register?plan=${plan.code}` : "/contato"} className="mt-8 inline-flex items-center justify-between border-b border-[#293e51] pb-3 text-sm font-semibold">{plan.isSelectable ? "Começar teste grátis" : "Falar com a Veela"}<ArrowUpRight className="size-4" /></Link></div>)}</div></section>

      <section id="faq" className="bg-[#eaece6] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[0.7fr_1fr]"><div><p className={`${eyebrow} text-[#8a9994]`}>05 / Perguntas frequentes</p><h2 className="mt-5 font-heading text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Sem dúvidas,<br />mais clareza.</h2></div><div className="border-t border-[#bcc9c1]">{faqs.map(item => <details key={item.question} className="group border-b border-[#bcc9c1] py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-heading text-lg font-medium">{item.question}<Plus className="size-5 shrink-0 transition group-open:rotate-45" /></summary><p className="mt-4 max-w-xl text-sm leading-7 text-[#687a70]">{item.answer}</p></details>)}</div></div></section>
      <section className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:px-12 lg:py-28"><div><p className={`${eyebrow} text-[#8a9994]`}>Seu trabalho merece atenção</p><h2 className="mt-5 max-w-3xl font-heading text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl">Vamos acompanhar suas imagens?</h2></div><Link href="/auth/register" className={primaryLink}>Começar teste grátis <ArrowRight className="size-4" /></Link></section>
    </div>
  );
}
