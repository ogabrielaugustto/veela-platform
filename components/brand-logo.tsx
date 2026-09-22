import Image from "next/image";

type BrandLogoProps = {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "color",
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src={variant === "white" ? "/logo-white.png" : "/logo-color.png"}
      alt="Veela"
      width={4724}
      height={1585}
      priority={priority}
      className={className}
    />
  );
}
