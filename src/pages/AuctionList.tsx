import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuctionStatus, getCarsByStatus } from "@/data/cars";
import { renderTimeLeft } from "@/lib/timeLeft";
import { useSEO } from "@/hooks/useSEO";

interface AuctionListProps {
  status: AuctionStatus;
  title: string;
  emptyMessage: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "year-asc" | "year-desc";

const priceOf = (car: { currentBid: number; startingBid: number }) =>
  car.currentBid > 0 ? car.currentBid : car.startingBid;

export const AuctionList = ({ status, title, emptyMessage }: AuctionListProps) => {
  useSEO({
    title,
    description: `${title} en AutoBids: mirá los autos disponibles y hacé tu oferta.`,
  });

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const carsForStatus = getCarsByStatus(status);
  const bidLabel = status === "proximo" ? "Oferta inicial" : "Oferta actual";

  const visibleCars = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? carsForStatus.filter(
          (car) => car.title.toLowerCase().includes(q) || car.brand.toLowerCase().includes(q)
        )
      : carsForStatus;

    if (sort === "default") return filtered;

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return priceOf(a) - priceOf(b);
        case "price-desc":
          return priceOf(b) - priceOf(a);
        case "year-asc":
          return a.year - b.year;
        case "year-desc":
          return b.year - a.year;
      }
    });
  }, [carsForStatus, query, sort]);

  return (
    <Layout>
      <div className="container py-16">
        <h1 className="section-title">{title}</h1>

        {carsForStatus.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              placeholder="Buscar por marca o modelo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="sm:max-w-[220px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Relevancia</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                <SelectItem value="year-desc">Año: más nuevo</SelectItem>
                <SelectItem value="year-asc">Año: más antiguo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {carsForStatus.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : visibleCars.length === 0 ? (
          <p className="text-muted-foreground">No encontramos autos que coincidan con tu búsqueda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                image={car.image}
                title={car.title}
                year={car.year}
                currentBid={priceOf(car)}
                timeLeft={renderTimeLeft(car)}
                bidLabel={bidLabel}
                bidCount={car.bidHistory.length}
                watchers={car.watchers}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
