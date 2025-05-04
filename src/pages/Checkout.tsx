
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Loader, CreditCard } from "lucide-react";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate processing
      setTimeout(() => {
        // Redirect to PayPal
        window.location.href = "https://www.paypal.com";
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error initiating the checkout process",
        variant: "destructive",
      });
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
              {isProcessing ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Redirecting to PayPal...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" />
                  Complete Purchase with PayPal
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
