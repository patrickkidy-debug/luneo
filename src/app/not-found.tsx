import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-luneo flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <p className="text-6xl font-extrabold text-luneo-red">404</p>
      <h1 className="text-2xl font-bold text-luneo-black">Page introuvable</h1>
      <p className="max-w-md text-sm text-black/60">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button href="/">Retour à l&apos;accueil</Button>
    </div>
  );
}
