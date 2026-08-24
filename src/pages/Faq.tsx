import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Necesito crear una cuenta para ofertar?",
    answer:
      "Sí, es necesario registrarte y verificar tu identidad antes de poder ofertar en cualquier subasta.",
  },
  {
    question: "¿Qué pasa si gano una subasta?",
    answer:
      "Recibís un email de confirmación con los datos del vehículo y las instrucciones de pago. Tenés 48 horas para completar el pago.",
  },
  {
    question: "¿Puedo cancelar una oferta?",
    answer:
      "Las ofertas son un compromiso de compra y no pueden cancelarse una vez confirmadas. Revisá el reglamento antes de ofertar.",
  },
  {
    question: "¿Por qué una subasta figura como suspendida?",
    answer:
      "Una subasta puede suspenderse por revisión de documentación del vehículo o a pedido del consignatario. Los participantes son notificados por email.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos transferencia bancaria, tarjeta de crédito y financiación para vehículos de alto valor. Más detalles en la sección Cómo pagar.",
  },
];

const Faq = () => {
  return (
    <Layout>
      <div className="container py-16 max-w-3xl">
        <h1 className="section-title">Preguntas frecuentes</h1>
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
};

export default Faq;
