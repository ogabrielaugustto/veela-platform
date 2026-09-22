import Link from "next/link";
import { APP_NAME } from "@/lib/brand";
import { BrandLogo } from "@/components/brand-logo";

type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: React.ReactNode;
  asideTitle: string;
  asideDescription: string;
};

export function AuthShell({
  title,
  description,
  eyebrow,
  children,
  asideTitle,
  asideDescription,
}: AuthShellProps) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      <div className="relative hidden overflow-hidden bg-[#2e4156] lg:flex">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />
        <div className="relative flex h-full flex-col justify-between p-10 text-primary-foreground">
          <Link className="flex items-center gap-3 font-medium" href="/">
            <BrandLogo variant="white" className="h-auto w-36" />
          </Link>
          <div className="max-w-md space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              {eyebrow}
            </p>
            <h2 className="font-heading text-4xl font-semibold tracking-tight">
              {asideTitle}
            </h2>
            <p className="text-base leading-7 text-white/80">
              {asideDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 sm:p-6 md:p-10">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <Link className="flex min-w-0 items-center font-medium" href="/" aria-label={`${APP_NAME} - início`}>
            <BrandLogo className="h-auto w-28 sm:w-32" />
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center py-8 sm:py-10">
          <div className="w-full space-y-8">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight">
                {title}
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
