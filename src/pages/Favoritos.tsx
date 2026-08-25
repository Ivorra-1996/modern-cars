import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { useFavorites } from "@/context/FavoritesContext";
import { getCarById } from "@/data/cars";
import { renderTimeLeft } from "@/lib/timeLeft";

const Favoritos = () => {
  const { favorites } = useFavorites();
  const cars = favorites.map((id) => getCarById(id)).filter((car) => car !== undefined);

  return (
    <Layout>
      <div className="container py-16">
        <h1 className="section-title">Mis Favoritos</h1>
        {cars.length === 0 ? (
          <p className="text-muted-foreground">
            Todavía no marcaste ningún auto como favorito. Tocá el corazón en cualquier subasta
            para guardarla acá.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                image={car.image}
                title={car.title}
                year={car.year}
                currentBid={car.currentBid > 0 ? car.currentBid : car.startingBid}
                timeLeft={renderTimeLeft(car)}
                bidLabel={car.currentBid > 0 ? "Oferta actual" : "Oferta inicial"}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favoritos;
