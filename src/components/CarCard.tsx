import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";

interface CarCardProps {
  id: string;
  image: string;
  title: string;
  year: number;
  currentBid: number;
  timeLeft: ReactNode;
  bidLabel?: string;
}

export const CarCard = ({
  id,
  image,
  title,
  year,
  currentBid,
  timeLeft,
  bidLabel = "Oferta actual",
}: CarCardProps) => {
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <Card className="car-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <button
          type="button"
          aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={() => toggle(id)}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
        >
          <Heart
            className={cn("w-4 h-4 text-white", favorite && "fill-accent text-accent")}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">
          {year} {title}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground">{bidLabel}</p>
            <p className="font-semibold text-primary">${currentBid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tiempo restante</p>
            <p className="font-semibold text-accent">{timeLeft}</p>
          </div>
        </div>
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link to={`/autos/${id}`}>Ver Detalles</Link>
        </Button>
      </div>
    </Card>
  );
};
