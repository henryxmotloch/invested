
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import InfoCollection from "./pages/InfoCollection";
import NotFound from "./pages/NotFound";
import Clipboard from "./pages/Clipboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Auth from "./pages/Auth";
import { useAuth } from "@/components/AuthProvider";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-12 text-center">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/info-collection" element={
      <ProtectedRoute>
        <InfoCollection />
      </ProtectedRoute>
    } />
    <Route path="/clipboard" element={
      <ProtectedRoute>
        <Clipboard />
      </ProtectedRoute>
    } />
    <Route path="/cart" element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    } />
    <Route path="/checkout" element={
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    } />
    <Route path="/success" element={
      <ProtectedRoute>
        <Success />
      </ProtectedRoute>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
