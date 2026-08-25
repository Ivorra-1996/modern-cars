import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { AuthDialog, AuthMode } from "./auth/AuthDialog";
import { ThemeToggle } from "./ThemeToggle";
import { useFavorites } from "@/context/FavoritesContext";
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
  Menu,
  Heart,
} from "lucide-react";

const navLinks = [
  { to: "/vigentes", label: "Vigentes", icon: Clock },
  { to: "/proximos", label: "Próximos", icon: Calendar },
  { to: "/suspendidos", label: "Suspendidos", icon: Ban },
  { to: "/terminadas", label: "Terminadas", icon: Archive },
];

const footerLinks = [
  { to: "/reglamento", label: "Reglamento", icon: BookOpen },
  { to: "/tutoriales", label: "Tutoriales", icon: Video },
  { to: "/como-pagar", label: "Cómo pagar", icon: CreditCard },
  { to: "/contacto", label: "Contacto", icon: Mail },
  { to: "/faq", label: "Preguntas frecuentes", icon: HelpCircle },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { favorites } = useFavorites();

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  return (
    <nav className="bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-heading font-bold text-primary">
            AutoBids
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <Link
                to="/favoritos"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Heart className="w-4 h-4" />
                Favoritos
                {favorites.length > 0 && (
                  <span className="text-xs font-semibold bg-accent text-accent-foreground rounded-full px-1.5 py-0.5">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" className="flex items-center gap-2" onClick={() => openAuth("login")}>
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </Button>
            <Button className="flex items-center gap-2" onClick={() => openAuth("register")}>
              <UserPlus className="w-4 h-4" />
              Registrarme
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <SheetTitle className="text-primary font-heading">AutoBids</SheetTitle>
                <div className="flex flex-col gap-4 mt-6">
                  {navLinks.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  ))}
                  <Link
                    to="/favoritos"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    Favoritos
                    {favorites.length > 0 && (
                      <span className="text-xs font-semibold bg-accent text-accent-foreground rounded-full px-1.5 py-0.5">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <div className="border-t pt-4 flex flex-col gap-4">
                    {footerLinks.map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start gap-2" onClick={() => openAuth("login")}>
                      <LogIn className="w-4 h-4" />
                      Iniciar sesión
                    </Button>
                    <Button className="justify-start gap-2" onClick={() => openAuth("register")}>
                      <UserPlus className="w-4 h-4" />
                      Registrarme
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} defaultTab={authMode} />
    </nav>
  );
};
