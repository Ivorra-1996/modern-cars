import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Layout } from "@/components/Layout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";

const contactSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Ingresá un email válido"),
  message: z.string().min(10, "Contanos un poco más (mínimo 10 caracteres)"),
});

const Contacto = () => {
  useSEO({
    title: "Contacto",
    description: "¿Tenés dudas sobre una subasta? Escribinos y te respondemos a la brevedad.",
  });

  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    toast({
      title: "Mensaje enviado",
      description: "Gracias, te vamos a responder a la brevedad.",
    });
    form.reset();
  };

  return (
    <Layout>
      <div className="container py-16 max-w-xl">
        <h1 className="section-title">Contacto</h1>
        <p className="text-muted-foreground mb-8">
          ¿Tenés dudas sobre una subasta o necesitás ayuda? Escribinos y te respondemos a la
          brevedad.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Contanos en qué te podemos ayudar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Enviar mensaje
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default Contacto;
