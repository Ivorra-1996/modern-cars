import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, CreditCard, Wallet } from "lucide-react";

const methods = [
  {
    icon: Landmark,
    title: "Transferencia bancaria",
    description:
      "Transferí el monto total a la cuenta que te indicamos por email al ganar la subasta. Acreditación en 24-48hs hábiles.",
  },
  {
    icon: CreditCard,
    title: "Tarjeta de crédito",
    description:
      "Pagá con tarjeta en hasta 3 cuotas sin interés a través de nuestra pasarela de pagos segura.",
  },
  {
    icon: Wallet,
    title: "Financiación",
    description:
      "Para vehículos de alto valor, ofrecemos financiación a través de entidades asociadas. Consultá condiciones al ganar la subasta.",
  },
];

const ComoPagar = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="section-title">Cómo pagar</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Una vez que ganás una subasta, tenés 48 horas para completar el pago. Estos son
          los métodos disponibles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg font-heading">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ComoPagar;
