
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Loader, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, paymentOption } = location.state || {};

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      // Create subscription record in the database
      if (userId) {
        const { data, error } = await supabase
          .from("UserSubscriptions")
          .insert({
            "User ID": userId,
            "Plan ID": "premium-plan", // Default to premium plan
            "Status": "active",
            "Start Date": new Date().toISOString(),
            "End Date": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          });
          
        if (error) {
          console.error("Error creating subscription:", error);
          toast({
            title: "Subscription error",
            description: "There was an issue creating your subscription",
            variant: "destructive",
          });
        } else {
          console.log("Subscription created:", data);
        }
      }

      // Create a demo report for the user
      if (userId) {
        const { data, error } = await supabase
          .from("UserReports")
          .insert({
            "User ID": userId,
            "Report Name": "Investment Education ROI Analysis",
            "Report Type": "financial",
            "Data": {
              "estimatedROI": "145%",
              "timeToRecoup": "18 months",
              "potentialSalaryIncrease": "$24,500"
            }
          });
          
        if (error) {
          console.error("Error creating report:", error);
        } else {
          console.log("Report created:", data);
        }
      }

      // Simulate processing
      setTimeout(() => {
        // Redirect to Success page
        navigate("/success", { state: { userId }});
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your payment",
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
              <div className="mt-4">
                <p className="flex justify-between">
                  <span>Premium Plan:</span>
                  <span>$49.99</span>
                </p>
                <p className="flex justify-between font-bold text-2xl mt-2">
                  <span>Total:</span>
                  <span>$49.99</span>
                </p>
              </div>
              {paymentOption && (
                <p className="mt-4 text-sm">
                  Payment Method: {paymentOption === 'upfront' ? 'Pay Upfront' : 
                                  paymentOption === 'installments' ? 'Monthly Installments' : 
                                  paymentOption === 'student-loan' ? 'Student Loan' : 
                                  paymentOption === 'scholarship' ? 'Scholarship' : 
                                  paymentOption === 'employer' ? 'Employer Sponsored' : 'Standard'}
                </p>
              )}
            </div>

            <Button 
              className="w-full md:w-auto"
              onClick={handlePurchase}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Processing payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" />
                  Complete Purchase
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
