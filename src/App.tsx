import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CarDetail from "./pages/CarDetail";
import { AuctionList } from "./pages/AuctionList";
import Reglamento from "./pages/Reglamento";
import Tutoriales from "./pages/Tutoriales";
import ComoPagar from "./pages/ComoPagar";
import Contacto from "./pages/Contacto";
import Faq from "./pages/Faq";
import Favoritos from "./pages/Favoritos";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <FavoritesProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/autos/:id" element={<CarDetail />} />
              <Route
                path="/vigentes"
                element={
                  <AuctionList
                    status="vigente"
                    title="Subastas Vigentes"
                    emptyMessage="No hay subastas vigentes en este momento."
                  />
                }
              />
              <Route
                path="/proximos"
                element={
                  <AuctionList
                    status="proximo"
                    title="Próximas Subastas"
                    emptyMessage="No hay subastas próximas por ahora."
                  />
                }
              />
              <Route
                path="/suspendidos"
                element={
                  <AuctionList
                    status="suspendido"
                    title="Subastas Suspendidas"
                    emptyMessage="No hay subastas suspendidas."
                  />
                }
              />
              <Route
                path="/terminadas"
                element={
                  <AuctionList
                    status="terminado"
                    title="Subastas Terminadas"
                    emptyMessage="Todavía no hay subastas finalizadas."
                  />
                }
              />
              <Route path="/reglamento" element={<Reglamento />} />
              <Route path="/tutoriales" element={<Tutoriales />} />
              <Route path="/como-pagar" element={<ComoPagar />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </FavoritesProvider>
  </ThemeProvider>
);

export default App;
