import { Hero } from "@/components/Hero";
import { CarCard } from "@/components/CarCard";
import { Layout } from "@/components/Layout";
import { getFeaturedCars } from "@/data/cars";

const Index = () => {
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
              timeLeft={car.timeLeft}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
