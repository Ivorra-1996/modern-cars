import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  id: string;
  image: string;
  title: string;
  year: number;
  currentBid: number;
  timeLeft: string;
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
  return (
    <Card className="car-card overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-2">
          {year} {title}
        </h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">{bidLabel}</p>
            <p className="font-semibold text-primary">${currentBid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tiempo restante</p>
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