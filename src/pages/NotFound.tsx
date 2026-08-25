import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SearchX } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  useSEO({ title: "Página no encontrada" });

  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container py-24 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
          <SearchX className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">
          No encontramos esta página.
        </p>
        <p className="text-muted-foreground mb-8 max-w-md">
          Puede que el auto que buscabas ya haya terminado su subasta, o que la
          dirección esté mal escrita.
        </p>
        <div className="flex gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/vigentes">Ver subastas vigentes</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
