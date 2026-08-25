import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { Car3DViewer } from "@/components/Car3DViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import { renderTimeLeft } from "@/lib/timeLeft";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
            <Carousel className="w-full">
              <CarouselContent>
                {car.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="block w-full aspect-video rounded-lg overflow-hidden cursor-zoom-in"
                    >
                      <img
                        src={img}
                        alt={`${car.title} ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {car.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>

            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                {car.year} {car.title}
              </h1>
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            <Card className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Kilometraje</p>
                <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transmisión</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combustible</p>
                <p className="font-semibold">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Motor</p>
                <p className="font-semibold">{car.engine}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-semibold">{car.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado de subasta</p>
                <p className="font-semibold">{statusLabels[car.status]}</p>
              </div>
            </Card>

            <div>
              <h2 className="text-xl font-heading font-semibold mb-2">Vista 3D</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Modelo 3D ilustrativo, no representa el vehículo exacto en subasta.
              </p>
              <div className="h-80 rounded-lg overflow-hidden border">
                <Car3DViewer className="w-full h-full" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold mb-4">
                Historial de ofertas
              </h2>
              {bidHistory.length === 0 ? (
                <p className="text-muted-foreground">Todavía no hay ofertas.</p>
              ) : (
                <div className="space-y-2">
                  {bidHistory.map((bid, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_120px_180px] items-center gap-x-4 gap-y-1 bg-secondary rounded-md px-4 py-3"
                    >
                      <span className="font-medium truncate">{bid.bidder}</span>
                      <span className="text-primary font-semibold text-right whitespace-nowrap">
                        ${bid.amount.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground col-span-2 sm:col-span-1 sm:text-right">
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
                <p className="text-sm text-muted-foreground">
                  {currentBid > 0 ? "Oferta actual" : "Oferta inicial"}
                </p>
                <p className="text-3xl font-heading font-bold text-primary">
                  ${(currentBid > 0 ? currentBid : car.startingBid).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tiempo restante</p>
                <p className="font-semibold text-accent">{renderTimeLeft(car)}</p>
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
                  timeLeft={renderTimeLeft(c)}
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

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl bg-black/95 border-none p-2">
          <DialogHeader className="sr-only">
            <DialogTitle>Galería de fotos de {car.title}</DialogTitle>
            <DialogDescription>Fotos del {car.title} en tamaño completo.</DialogDescription>
          </DialogHeader>
          <Carousel className="w-full">
            <CarouselContent>
              {car.images.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt={`${car.title} ${index + 1}`}
                    className="w-full max-h-[80vh] object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {car.images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CarDetail;
