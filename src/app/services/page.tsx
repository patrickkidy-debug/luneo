import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { ServiceCard } from "@/components/service/ServiceCard";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Examen de vue, montage, ajustement, réparation : découvrez tous les services LUNEO en Côte d'Ivoire.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container-luneo py-10">
      <h1 className="text-2xl font-bold text-luneo-black sm:text-3xl">Nos services</h1>
      <p className="mt-2 max-w-xl text-sm text-black/60">
        Un accompagnement complet par des opticiens qualifiés, du premier examen à l&apos;après-vente.
      </p>

      {services.length === 0 ? (
        <p className="mt-8 text-sm text-black/50">Aucun service disponible pour le moment.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
