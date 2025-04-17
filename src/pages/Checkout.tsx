
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to complete your purchase",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const purchaseData = {
        PurchaseID: crypto.randomUUID(),
        CustomerID: user.id,
        PurchaseDate: new Date().toISOString(),
        TransactionID: crypto.randomUUID(),
      };

      const { error } = await supabase
        .from("Purchase")
        .insert(purchaseData);

      if (error) throw error;

      toast({
        title: "Purchase successful!",
        description: "Thank you for your purchase",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error processing your purchase",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <p className="text-lg text-muted-foreground mt-2">InvestEd Compass Premium</p>
              <p className="text-2xl font-bold mt-4">Total: $49.99</p>
            </div>

            <Button 
              className="w-full md:w-auto"
              onClick={handlePurchase}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Complete Purchase"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
