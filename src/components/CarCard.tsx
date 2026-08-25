import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, Gavel } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  bidCount?: number;
  watchers?: number;
}

export const CarCard = ({
  id,
  image,
  title,
  year,
  currentBid,
  timeLeft,
  bidLabel = "Oferta actual",
  bidCount,
  watchers,
}: CarCardProps) => {
  const { isFavorite, toggle } = useFavorites();
  const favorite = isFavorite(id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true);
  }, []);

  return (
    <Card className="car-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        {!imageLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
        <img
          ref={imgRef}
          src={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "object-cover w-full h-full transition-transform duration-300 hover:scale-105",
            !imageLoaded && "opacity-0"
          )}
        />
        {typeof watchers === "number" && watchers > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-2 py-1 text-xs text-white">
            <Eye className="w-3 h-3" />
            {watchers}
          </div>
        )}
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
        <div className="flex justify-between items-center mb-1">
          <div>
            <p className="text-sm text-muted-foreground">{bidLabel}</p>
            <p className="font-semibold text-primary">${currentBid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tiempo restante</p>
            <p className="font-semibold text-accent">{timeLeft}</p>
          </div>
        </div>
        {typeof bidCount === "number" && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <Gavel className="w-3 h-3" />
            {bidCount > 0 ? `${bidCount} oferta${bidCount === 1 ? "" : "s"}` : "Sin ofertas todavía"}
          </p>
        )}
        {typeof bidCount !== "number" && <div className="mb-4" />}
        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link to={`/autos/${id}`}>Ver Detalles</Link>
        </Button>
      </div>
    </Card>
  );
};
