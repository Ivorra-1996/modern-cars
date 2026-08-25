import { Link } from "react-router-dom";
import {
  BookOpen,
  Video,
  CreditCard,
  Mail,
  HelpCircle,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <Link to="/reglamento" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <BookOpen className="w-4 h-4" />
              Reglamento
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/tutoriales" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Video className="w-4 h-4" />
              Tutoriales
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/como-pagar" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <CreditCard className="w-4 h-4" />
              Cómo pagar
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/contacto" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Mail className="w-4 h-4" />
              Contacto
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/faq" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <HelpCircle className="w-4 h-4" />
              Preguntas frecuentes
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t space-y-2">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} AutoBids. Todos los derechos reservados.
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Modelo 3D "Car Concept" por Eric Chadwick / Darmstadt Graphics Group GmbH, licencia{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/legalcode"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              CC BY 4.0
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};