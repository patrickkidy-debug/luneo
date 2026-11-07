import { Button } from "@/components/ui/Button";
import { TornEdge } from "@/components/brand/TornEdge";
import { Logo } from "@/components/brand/Logo";

export function PromoBanner() {
  return (
    <section className="text-luneo-red">
      <TornEdge seed={19} />
      <div className="bg-luneo-red">
        <div className="container-luneo flex flex-col items-center py-16 text-center text-white">
          <span className="text-3xl">
            <Logo tone="light" ring="white" />
          </span>
          <p className="font-poster mt-6 text-5xl sm:text-7xl">
            Votre regard,
            <br />
            <span className="inline-block -rotate-2 bg-luneo-black px-4 pb-1">votre signature.</span>
          </p>
          <div className="mt-10">
            <Button href="/lunettes-de-vue" variant="secondary" size="lg">
              Découvrir nos nouveautés →
            </Button>
          </div>
        </div>
      </div>
      <TornEdge seed={23} flip />
    </section>
  );
}
