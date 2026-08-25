import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

const tutorials = [
  {
    title: "Cómo crear tu cuenta y verificarte",
    duration: "3:12",
  },
  {
    title: "Cómo hacer tu primera oferta",
    duration: "4:05",
  },
  {
    title: "Cómo funcionan los incrementos de oferta",
    duration: "2:48",
  },
  {
    title: "Qué pasa cuando ganás una subasta",
    duration: "3:30",
  },
  {
    title: "Métodos de pago disponibles",
    duration: "2:15",
  },
  {
    title: "Cómo leer el reglamento antes de ofertar",
    duration: "5:00",
  },
];

const Tutoriales = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="section-title">Tutoriales</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Mirá estos videos cortos para aprender a moverte por AutoBids y participar en tu
          primera subasta con confianza.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.title} className="overflow-hidden car-card">
              <div className="aspect-video bg-secondary flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-primary/60" />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold mb-1">{tutorial.title}</h3>
                <p className="text-sm text-muted-foreground">{tutorial.duration}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tutoriales;
