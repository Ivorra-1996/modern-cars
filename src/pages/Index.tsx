import { Star } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CarCard } from "@/components/CarCard";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { getFeaturedCars } from "@/data/cars";
import { renderTimeLeft } from "@/lib/timeLeft";
import { useSEO } from "@/hooks/useSEO";

const testimonials = [
  {
    name: "Martín Cabrera",
    role: "Ganó un Porsche 911 GT3",
    quote:
      "Ofertar fue mucho más simple de lo que pensaba. El seguimiento en vivo de las ofertas me dio la confianza para llegar hasta el final.",
  },
  {
    name: "Lucía Fernández",
    role: "Compradora frecuente",
    quote:
      "Ya gané dos subastas acá. La transparencia del historial de ofertas es lo que más valoro frente a comprar por fuera.",
  },
  {
    name: "Diego Ortiz",
    role: "Vendió su Audi RS6",
    quote:
      "El proceso de consignación fue rápido y la subasta cerró por encima de lo que esperaba. Totalmente recomendable.",
  },
];

const Index = () => {
  useSEO({
    title: "Inicio",
    description:
      "Subastas en vivo de autos exclusivos y de colección. Ofertá desde la comodidad de tu hogar con AutoBids.",
  });

  const featuredCars = getFeaturedCars();

  return (
    <Layout>
      <Hero />
      <div className="container py-16">
        <h2 className="section-title">Subastas Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              image={car.image}
              title={car.title}
              year={car.year}
              currentBid={car.currentBid}
              timeLeft={renderTimeLeft(car)}
              bidCount={car.bidHistory.length}
              watchers={car.watchers}
            />
          ))}
        </div>
      </div>

      <div className="bg-secondary py-16">
        <div className="container">
          <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <div className="flex gap-1 text-accent mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{t.quote}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
