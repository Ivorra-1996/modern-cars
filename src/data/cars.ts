export type AuctionStatus = "vigente" | "proximo" | "suspendido" | "terminado";

export interface Bid {
  bidder: string;
  amount: number;
  date: string;
}

export interface Car {
  id: string;
  title: string;
  brand: string;
  year: number;
  image: string;
  images: string[];
  description: string;
  status: AuctionStatus;
  currentBid: number;
  startingBid: number;
  bidIncrement: number;
  timeLeft: string;
  endDate: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  engine: string;
  location: string;
  featured?: boolean;
  watchers: number;
  bidHistory: Bid[];
}

const PORSCHE_IMG =
  "https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
const FERRARI_IMG =
  "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
const LAMBO_IMG =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
const AMG_IMG =
  "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
const PLACEHOLDER_IMG = "/placeholder.svg";

export const cars: Car[] = [
  {
    id: "1",
    title: "Porsche 911 GT3",
    brand: "Porsche",
    year: 2021,
    image: PORSCHE_IMG,
    images: [PORSCHE_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    description:
      "Ejemplar de colección con mantenimiento al día en concesionario oficial. Motor atmosférico 4.0L bóxer, suspensión deportiva PASM y paquete Clubsport.",
    status: "vigente",
    currentBid: 175000,
    startingBid: 150000,
    bidIncrement: 2500,
    timeLeft: "2d 14h",
    endDate: "2026-08-27T10:00:00",
    mileage: 8200,
    transmission: "PDK automática",
    fuelType: "Nafta",
    engine: "4.0L Bóxer 6 cilindros",
    location: "Buenos Aires, AR",
    featured: true,
    watchers: 34,
    bidHistory: [
      { bidder: "carlos_m", amount: 175000, date: "2026-08-23T18:40:00" },
      { bidder: "auto_fan88", amount: 170000, date: "2026-08-22T09:15:00" },
      { bidder: "jrivera", amount: 162000, date: "2026-08-20T21:05:00" },
    ],
  },
  {
    id: "2",
    title: "Ferrari 488 GTB",
    brand: "Ferrari",
    year: 2020,
    image: FERRARI_IMG,
    images: [FERRARI_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    description:
      "V8 biturbo de 670 CV, único dueño, service completo en red oficial Ferrari. Interior en cuero Rosso con costuras a contraste.",
    status: "vigente",
    currentBid: 245000,
    startingBid: 210000,
    bidIncrement: 5000,
    timeLeft: "3d 8h",
    endDate: "2026-08-27T16:00:00",
    mileage: 5400,
    transmission: "F1 doble embrague",
    fuelType: "Nafta",
    engine: "3.9L V8 Biturbo",
    location: "Córdoba, AR",
    featured: true,
    watchers: 41,
    bidHistory: [
      { bidder: "speedster_99", amount: 245000, date: "2026-08-23T20:10:00" },
      { bidder: "carlos_m", amount: 235000, date: "2026-08-21T11:30:00" },
    ],
  },
  {
    id: "3",
    title: "Lamborghini Huracán",
    brand: "Lamborghini",
    year: 2022,
    image: LAMBO_IMG,
    images: [LAMBO_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    description:
      "Huracán EVO con tracción integral, sistema LDVI y llantas forjadas. Sin siniestros, garantía vigente de fábrica.",
    status: "vigente",
    currentBid: 298000,
    startingBid: 260000,
    bidIncrement: 5000,
    timeLeft: "1d 6h",
    endDate: "2026-08-25T14:00:00",
    mileage: 3100,
    transmission: "Automática 7 velocidades",
    fuelType: "Nafta",
    engine: "5.2L V10",
    location: "Rosario, AR",
    featured: true,
    watchers: 56,
    bidHistory: [
      { bidder: "jrivera", amount: 298000, date: "2026-08-24T08:00:00" },
      { bidder: "auto_fan88", amount: 290000, date: "2026-08-23T22:45:00" },
      { bidder: "speedster_99", amount: 280000, date: "2026-08-22T13:20:00" },
    ],
  },
  {
    id: "4",
    title: "Mercedes-AMG GT",
    brand: "Mercedes-Benz",
    year: 2021,
    image: AMG_IMG,
    images: [AMG_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    description:
      "AMG GT con motor V8 biturbo M178, paquete AMG Dynamic Plus y frenos cerámicos. Excelente estado general.",
    status: "vigente",
    currentBid: 156000,
    startingBid: 135000,
    bidIncrement: 2000,
    timeLeft: "4d 12h",
    endDate: "2026-08-28T20:00:00",
    mileage: 12500,
    transmission: "AMG Speedshift DCT",
    fuelType: "Nafta",
    engine: "4.0L V8 Biturbo",
    location: "Mendoza, AR",
    featured: true,
    watchers: 29,
    bidHistory: [
      { bidder: "auto_fan88", amount: 156000, date: "2026-08-23T15:00:00" },
      { bidder: "carlos_m", amount: 150000, date: "2026-08-21T10:10:00" },
    ],
  },
  {
    id: "5",
    title: "BMW M4 Competition",
    brand: "BMW",
    year: 2023,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "M4 Competition con paquete Carbono, escape M Performance y suspensión adaptativa. Cero siniestros, service oficial BMW.",
    status: "vigente",
    currentBid: 98000,
    startingBid: 85000,
    bidIncrement: 1500,
    timeLeft: "5d 3h",
    endDate: "2026-08-29T11:00:00",
    mileage: 6700,
    transmission: "Automática 8 velocidades",
    fuelType: "Nafta",
    engine: "3.0L 6 en línea Biturbo",
    location: "La Plata, AR",
    watchers: 18,
    bidHistory: [{ bidder: "jrivera", amount: 98000, date: "2026-08-23T09:30:00" }],
  },
  {
    id: "6",
    title: "Audi RS6 Avant",
    brand: "Audi",
    year: 2022,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "RS6 Avant quattro con 600 CV, techo panorámico y sistema B&O 3D. Subasta abre en los próximos días.",
    status: "proximo",
    currentBid: 0,
    startingBid: 120000,
    bidIncrement: 2000,
    timeLeft: "Inicia en 3d",
    endDate: "2026-08-27T09:00:00",
    mileage: 9800,
    transmission: "Tiptronic 8 velocidades",
    fuelType: "Nafta",
    engine: "4.0L V8 Biturbo",
    location: "Buenos Aires, AR",
    watchers: 22,
    bidHistory: [],
  },
  {
    id: "7",
    title: "Nissan GT-R Nismo",
    brand: "Nissan",
    year: 2021,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "GT-R Nismo con motor VR38DETT preparado en fábrica, aerodinámica de carbono y tracción ATTESA E-TS.",
    status: "proximo",
    currentBid: 0,
    startingBid: 165000,
    bidIncrement: 3000,
    timeLeft: "Inicia en 5d",
    endDate: "2026-08-29T09:00:00",
    mileage: 4200,
    transmission: "Doble embrague 6 velocidades",
    fuelType: "Nafta",
    engine: "3.8L V6 Biturbo",
    location: "Neuquén, AR",
    watchers: 31,
    bidHistory: [],
  },
  {
    id: "8",
    title: "Aston Martin Vantage",
    brand: "Aston Martin",
    year: 2020,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "Vantage con motor AMG V8 biturbo, interior en Alcantara y paquete Sport Plus. Documentación al día.",
    status: "proximo",
    currentBid: 0,
    startingBid: 140000,
    bidIncrement: 2500,
    timeLeft: "Inicia en 7d",
    endDate: "2026-08-31T09:00:00",
    mileage: 7300,
    transmission: "Automática 8 velocidades",
    fuelType: "Nafta",
    engine: "4.0L V8 Biturbo",
    location: "Mar del Plata, AR",
    watchers: 15,
    bidHistory: [],
  },
  {
    id: "9",
    title: "Chevrolet Corvette C8",
    brand: "Chevrolet",
    year: 2023,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "Corvette C8 Stingray de motor central. Subasta suspendida temporalmente por revisión de documentación del vendedor.",
    status: "suspendido",
    currentBid: 132000,
    startingBid: 110000,
    bidIncrement: 2000,
    timeLeft: "Suspendida",
    endDate: "2026-08-26T09:00:00",
    mileage: 2100,
    transmission: "Doble embrague 8 velocidades",
    fuelType: "Nafta",
    engine: "6.2L V8",
    location: "Salta, AR",
    watchers: 9,
    bidHistory: [{ bidder: "speedster_99", amount: 132000, date: "2026-08-20T17:40:00" }],
  },
  {
    id: "10",
    title: "Jaguar F-Type R",
    brand: "Jaguar",
    year: 2019,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "F-Type R AWD con escape activo Jaguar. Subasta suspendida a pedido del consignatario.",
    status: "suspendido",
    currentBid: 88000,
    startingBid: 75000,
    bidIncrement: 1500,
    timeLeft: "Suspendida",
    endDate: "2026-08-25T09:00:00",
    mileage: 15600,
    transmission: "Automática 8 velocidades",
    fuelType: "Nafta",
    engine: "5.0L V8 Sobrealimentado",
    location: "Bariloche, AR",
    watchers: 6,
    bidHistory: [{ bidder: "jrivera", amount: 88000, date: "2026-08-19T12:00:00" }],
  },
  {
    id: "11",
    title: "Alfa Romeo Giulia Quadrifoglio",
    brand: "Alfa Romeo",
    year: 2020,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "Giulia Quadrifoglio con motor Ferrari-derivado. Subasta finalizada, vendida al mejor postor.",
    status: "terminado",
    currentBid: 118000,
    startingBid: 95000,
    bidIncrement: 2000,
    timeLeft: "Finalizada",
    endDate: "2026-08-10T09:00:00",
    mileage: 21000,
    transmission: "Automática 8 velocidades",
    fuelType: "Nafta",
    engine: "2.9L V6 Biturbo",
    location: "Buenos Aires, AR",
    watchers: 12,
    bidHistory: [
      { bidder: "carlos_m", amount: 118000, date: "2026-08-10T08:55:00" },
      { bidder: "auto_fan88", amount: 112000, date: "2026-08-09T19:20:00" },
    ],
  },
  {
    id: "12",
    title: "Ford Mustang Shelby GT500",
    brand: "Ford",
    year: 2021,
    image: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    description:
      "Shelby GT500 supercargado de 760 HP. Subasta finalizada con récord de pujas para la categoría.",
    status: "terminado",
    currentBid: 145000,
    startingBid: 120000,
    bidIncrement: 2500,
    timeLeft: "Finalizada",
    endDate: "2026-08-05T09:00:00",
    mileage: 6100,
    transmission: "Doble embrague 7 velocidades",
    fuelType: "Nafta",
    engine: "5.2L V8 Sobrealimentado",
    location: "Rosario, AR",
    watchers: 19,
    bidHistory: [
      { bidder: "speedster_99", amount: 145000, date: "2026-08-05T08:50:00" },
      { bidder: "jrivera", amount: 138000, date: "2026-08-04T21:10:00" },
    ],
  },
];

export const getCarsByStatus = (status: AuctionStatus): Car[] =>
  cars.filter((car) => car.status === status);

export const getCarById = (id: string): Car | undefined =>
  cars.find((car) => car.id === id);

export const getFeaturedCars = (): Car[] => cars.filter((car) => car.featured);
