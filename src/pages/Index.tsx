import { Hero } from "@/components/Hero";
import { CarCard } from "@/components/CarCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const featuredCars = [
  {
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Porsche 911 GT3",
    year: 2021,
    currentBid: 175000,
    timeLeft: "2d 14h",
  },
  {
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Ferrari 488 GTB",
    year: 2020,
    currentBid: 245000,
    timeLeft: "3d 8h",
  },
  {
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Lamborghini Huracán",
    year: 2022,
    currentBid: 298000,
    timeLeft: "1d 6h",
  },
  {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "Mercedes-AMG GT",
    year: 2021,
    currentBid: 156000,
    timeLeft: "4d 12h",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="container py-16 flex-grow">
        <h2 className="section-title">Subastas Destacadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, index) => (
            <CarCard key={index} {...car} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;