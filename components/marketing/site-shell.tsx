import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { MarketingMobileNav } from "@/components/marketing/mobile-nav";

const navigationLinks = [
  { href: "/", label: "Início" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#planos", label: "Planos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/validar-notificacao", label: "Validar notificação" },
  { href: "/contato", label: "Contato" },
];

export function MarketingSiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">

      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <BrandLogo priority className="h-auto w-32 sm:w-36" />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                className="transition hover:text-foreground"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild size="sm" variant="ghost">
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/register">Criar conta</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <MarketingMobileNav navigationLinks={navigationLinks} />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-muted/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-xl space-y-3">
            <BrandLogo className="h-auto w-36" />
            <p className="text-sm leading-6 text-muted-foreground">
              Monitoramento de imagens com foco em triagem, evidências operacionais
              e validação humana antes de qualquer ação.
            </p>
            <p className="text-sm leading-6 text-primary">
              Plataforma com diretrizes de privacidade, cookies e tratamento de dados alinhadas à LGPD.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="/">
              Início
            </Link>
            <Link className="hover:text-foreground" href="/sobre">
              Sobre
            </Link>
            <Link className="hover:text-foreground" href="/contato">
              Contato
            </Link>
            <Link className="hover:text-foreground" href="/validar-notificacao">
              Validar notificação
            </Link>
            <Link className="hover:text-foreground" href="/termos-de-uso">
              Termos de Uso
            </Link>
            <Link className="hover:text-foreground" href="/politica-de-privacidade">
              Privacidade
            </Link>
            <Link className="hover:text-foreground" href="/auth/login">
              Entrar
            </Link>
            <Link className="hover:text-foreground" href="/auth/register">
              Criar conta
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
