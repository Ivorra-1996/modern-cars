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
            <Link to="/reglamento" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <BookOpen className="w-4 h-4" />
              Reglamento
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/tutoriales" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <Video className="w-4 h-4" />
              Tutoriales
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/como-pagar" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <CreditCard className="w-4 h-4" />
              Cómo pagar
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/contacto" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <Mail className="w-4 h-4" />
              Contacto
            </Link>
          </div>
          
          <div className="space-y-4">
            <Link to="/faq" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <HelpCircle className="w-4 h-4" />
              Preguntas frecuentes
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AutoBids. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};