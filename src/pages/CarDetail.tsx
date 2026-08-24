import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cars, getCarById } from "@/data/cars";

const statusLabels: Record<string, string> = {
  vigente: "Vigente",
  proximo: "Próxima",
  suspendido: "Suspendida",
  terminado: "Finalizada",
};

const CarDetail = () => {
  const { id } = useParams();
  const car = id ? getCarById(id) : undefined;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentBid, setCurrentBid] = useState(car?.currentBid ?? 0);
  const [bidHistory, setBidHistory] = useState(car?.bidHistory ?? []);
  const { toast } = useToast();

  const minBid = car
    ? currentBid > 0
      ? currentBid + car.bidIncrement
      : car.startingBid
    : 0;

  const bidSchema = z.object({
    amount: z.coerce
      .number({ invalid_type_error: "Ingresá un monto válido" })
      .min(minBid, `La oferta debe ser al menos $${minBid.toLocaleString()}`),
  });

  const form = useForm<z.infer<typeof bidSchema>>({
    resolver: zodResolver(bidSchema),
    defaultValues: { amount: minBid },
  });

  if (!car) {
    return <Navigate to="/404" replace />;
  }

  const onSubmit = (values: z.infer<typeof bidSchema>) => {
    setCurrentBid(values.amount);
    setBidHistory([
      { bidder: "vos", amount: values.amount, date: new Date().toISOString() },
      ...bidHistory,
    ]);
    toast({
      title: "¡Oferta registrada!",
      description: `Ofertaste $${values.amount.toLocaleString()} por el ${car.title}.`,
    });
    setDialogOpen(false);
    form.reset({ amount: values.amount + car.bidIncrement });
  };

  const canBid = car.status === "vigente";
  const relatedCars = cars
    .filter((c) => c.id !== car.id && c.status === car.status)
    .slice(0, 4);

  return (
    <Layout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={car.image}
                alt={car.title}
                className="object-cover w-full h-full"
              />
            </div>
            {car.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {car.images.slice(1).map((img, index) => (
                  <div key={index} className="aspect-video rounded-md overflow-hidden">
                    <img
                      src={img}
                      alt={`${car.title} ${index + 2}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                {car.year} {car.title}
              </h1>
              <p className="text-gray-600">{car.description}</p>
            </div>

            <Card className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Kilometraje</p>
                <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transmisión</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Combustible</p>
                <p className="font-semibold">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Motor</p>
                <p className="font-semibold">{car.engine}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p className="font-semibold">{car.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado de subasta</p>
                <p className="font-semibold">{statusLabels[car.status]}</p>
              </div>
            </Card>

            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">
                Historial de ofertas
              </h2>
              {bidHistory.length === 0 ? (
                <p className="text-gray-500">Todavía no hay ofertas.</p>
              ) : (
                <div className="space-y-2">
                  {bidHistory.map((bid, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-secondary rounded-md px-4 py-3"
                    >
                      <span className="font-medium">{bid.bidder}</span>
                      <span className="text-primary font-semibold">
                        ${bid.amount.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(bid.date).toLocaleString("es-AR")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <Card className="p-6 sticky top-4 space-y-4">
              <Badge className="bg-accent hover:bg-accent">
                {statusLabels[car.status]}
              </Badge>
              <div>
                <p className="text-sm text-gray-500">
                  {currentBid > 0 ? "Oferta actual" : "Oferta inicial"}
                </p>
                <p className="text-3xl font-heading font-bold text-primary">
                  ${(currentBid > 0 ? currentBid : car.startingBid).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tiempo restante</p>
                <p className="font-semibold text-accent">{car.timeLeft}</p>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!canBid}
                onClick={() => setDialogOpen(true)}
              >
                {canBid ? "Ofertar" : "Subasta no disponible"}
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/${car.status === "vigente" ? "vigentes" : car.status === "proximo" ? "proximos" : car.status === "suspendido" ? "suspendidos" : "terminadas"}`}>
                  Ver más subastas
                </Link>
              </Button>
            </Card>
          </div>
        </div>

        {relatedCars.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title">Autos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((c) => (
                <CarCard
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  title={c.title}
                  year={c.year}
                  currentBid={c.currentBid > 0 ? c.currentBid : c.startingBid}
                  timeLeft={c.timeLeft}
                  bidLabel={c.currentBid > 0 ? "Oferta actual" : "Oferta inicial"}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ofertar por {car.title}</DialogTitle>
            <DialogDescription>
              La oferta mínima es ${minBid.toLocaleString()}.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto de la oferta (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Confirmar oferta
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CarDetail;
