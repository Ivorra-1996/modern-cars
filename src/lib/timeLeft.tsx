import type { ReactNode } from "react";
import { Countdown } from "@/components/Countdown";
import type { Car } from "@/data/cars";

export const renderTimeLeft = (car: Car): ReactNode => {
  if (car.status === "vigente") {
    return <Countdown target={car.endDate} expiredLabel="Finalizada" />;
  }
  if (car.status === "proximo") {
    return <Countdown target={car.endDate} prefix="Inicia en" expiredLabel="Iniciando" />;
  }
  return car.timeLeft;
};
