import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const rules = [
  {
    title: "1. Registro y verificación",
    content:
      "Para participar de cualquier subasta es necesario crear una cuenta y verificar tu identidad con un documento válido. Solo las cuentas verificadas pueden ofertar.",
  },
  {
    title: "2. Cómo funcionan las ofertas",
    content:
      "Cada auto tiene una oferta inicial y un incremento mínimo entre ofertas. Al ofertar, tu monto debe superar la oferta actual en al menos ese incremento. La oferta más alta al cierre de la subasta gana.",
  },
  {
    title: "3. Compromiso de compra",
    content:
      "Ganar una subasta implica el compromiso de completar el pago dentro de las 48 horas posteriores al cierre. El incumplimiento puede derivar en la suspensión de la cuenta.",
  },
  {
    title: "4. Subastas suspendidas",
    content:
      "Una subasta puede suspenderse por revisión de documentación del vehículo, pedido del consignatario o incumplimiento de estas normas. Los participantes son notificados por email.",
  },
  {
    title: "5. Comisiones",
    content:
      "AutoBids cobra una comisión sobre el precio final de venta, detallada antes de confirmar cada oferta ganadora.",
  },
];

const Reglamento = () => {
  return (
    <Layout>
      <div className="container py-16 max-w-3xl">
        <h1 className="section-title">Reglamento</h1>
        <p className="text-gray-600 mb-8">
          Estas son las reglas que rigen todas las subastas en AutoBids. Te recomendamos
          leerlas antes de ofertar por primera vez.
        </p>
        <Accordion type="single" collapsible>
          {rules.map((rule) => (
            <AccordionItem key={rule.title} value={rule.title}>
              <AccordionTrigger>{rule.title}</AccordionTrigger>
              <AccordionContent>{rule.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default Reglamento;
