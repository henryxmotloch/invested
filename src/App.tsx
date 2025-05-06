
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InfoCollection from "./pages/InfoCollection";
import NotFound from "./pages/NotFound";
import Clipboard from "./pages/Clipboard";
import Cart from "./pages/Cart";
import PaymentOption from "./pages/PaymentOption";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/info-collection" element={<InfoCollection />} />
    <Route path="/clipboard" element={<Clipboard />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/payment-option" element={<PaymentOption />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/success" element={<Success />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
