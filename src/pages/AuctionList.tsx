import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { AuctionStatus, getCarsByStatus } from "@/data/cars";

interface AuctionListProps {
  status: AuctionStatus;
  title: string;
  emptyMessage: string;
}

export const AuctionList = ({ status, title, emptyMessage }: AuctionListProps) => {
  const carsForStatus = getCarsByStatus(status);
  const bidLabel = status === "proximo" ? "Oferta inicial" : "Oferta actual";

  return (
    <Layout>
      <div className="container py-16">
        <h1 className="section-title">{title}</h1>
        {carsForStatus.length === 0 ? (
          <p className="text-gray-500">{emptyMessage}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carsForStatus.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                image={car.image}
                title={car.title}
                year={car.year}
                currentBid={car.currentBid > 0 ? car.currentBid : car.startingBid}
                timeLeft={car.timeLeft}
                bidLabel={bidLabel}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
