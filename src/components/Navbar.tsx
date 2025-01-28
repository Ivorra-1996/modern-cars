import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Clock,
  Calendar,
  Ban,
  Archive,
  BookOpen,
  Video,
  CreditCard,
  Mail,
  HelpCircle,
  LogIn,
  UserPlus,
} from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            AutoBids
          </Link>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <Link to="/vigentes" className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <Clock className="w-4 h-4" />
                Vigentes
              </Link>
              <Link to="/proximos" className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <Calendar className="w-4 h-4" />
                Próximos
              </Link>
              <Link to="/suspendidos" className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <Ban className="w-4 h-4" />
                Suspendidos
              </Link>
              <Link to="/terminadas" className="flex items-center gap-2 text-gray-600 hover:text-primary">
                <Archive className="w-4 h-4" />
                Terminadas
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </Button>
            <Button className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Registrarme
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};