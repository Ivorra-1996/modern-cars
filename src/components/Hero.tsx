import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-primary/50" />
      </div>
      
      <div className="container relative z-10 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Subastas de Autos Exclusivos
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Descubre los mejores vehículos de colección y participa en subastas únicas desde la comodidad de tu hogar.
        </p>
        <Button size="lg" className="bg-accent hover:bg-accent/90">
          Explorar Subastas
        </Button>
      </div>
    </div>
  );
};