import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car3DViewer } from "@/components/Car3DViewer";

export const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center overflow-hidden bg-[#07070b]">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_65%_60%_at_70%_60%,rgba(255,107,107,0.16),transparent_70%)]" />

      <div
        className="absolute z-[5] left-1/2 bottom-[16%] -translate-x-1/2 w-[75%] max-w-[820px] h-20 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 50%, transparent 75%)",
          boxShadow: "0 0 60px 12px rgba(255,107,107,0.12)",
        }}
      />

      <div className="absolute inset-0 z-10">
        <Car3DViewer interactive={false} defaultVariant="Pearly Swirly" className="w-full h-full" />
      </div>

      <div className="absolute inset-0 z-[15] pointer-events-none bg-[linear-gradient(90deg,rgba(7,7,11,0.97)_0%,rgba(7,7,11,0.85)_42%,transparent_66%)]" />

      <div className="container relative z-20 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-xl">
          Subastas de Autos Exclusivos
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Descubre los mejores vehículos de colección y participa en subastas únicas desde la comodidad de tu hogar.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
          <Link to="/vigentes">Explorar Subastas</Link>
        </Button>
      </div>
    </div>
  );
};
