import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-luneo-black">
      <div className="absolute inset-0">
        <Image
          src={images.framesDisplay}
          alt="Monture LUNEO"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>
      <div className="container-luneo relative py-20 text-center text-white">
        <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          LUNE<span className="text-luneo-red">O</span>
        </p>
        <p className="mx-auto mt-4 max-w-lg text-xl font-semibold sm:text-2xl">
          Votre regard,
          <br />
          votre signature.
        </p>
        <div className="mt-8">
          <Button href="/lunettes-de-vue" size="lg">
            Découvrir nos nouveautés →
          </Button>
        </div>
      </div>
    </section>
  );
}
