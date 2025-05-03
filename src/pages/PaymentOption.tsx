
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

interface LocationState {
  name: string;
  userId: string;
  location: string;
  budget: string;
  duration: string;
  fieldOfStudy: string;
}

const PaymentOption = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [paymentOption, setPaymentOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state?.name) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentOption) {
      toast.error("Please select a payment option");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting payment info:", { 
        ...state, 
        paymentOption 
      });
      
      // Update user record with selected payment option
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/save-user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({ 
          name: state.name,
          userId: state.userId,
          location: state.location,
          budget: state.budget,
          duration: state.duration,
          fieldOfStudy: state.fieldOfStudy,
          paymentOption
        }),
      });
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing response:", e);
        throw new Error("Invalid response from server");
      }
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to update payment information");
      }
      
      console.log("Payment info updated successfully:", data);
      
      navigate("/clipboard", { 
        state: { 
          ...state,
          paymentOption
        } 
      });
    } catch (error) {
      console.error('Error updating payment info:', error);
      toast.error("Failed to update your payment information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h1 className="text-3xl font-bold mb-6">Payment Options</h1>
          <p className="text-lg text-muted-foreground mb-8">
            How would you prefer to finance your education?
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium">Select Payment Method:</label>
              <Select value={paymentOption} onValueChange={setPaymentOption}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select payment option..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="upfront">Pay Upfront</SelectItem>
                  <SelectItem value="installments">Monthly Installments</SelectItem>
                  <SelectItem value="student-loan">Student Loan</SelectItem>
                  <SelectItem value="scholarship">Scholarship</SelectItem>
                  <SelectItem value="employer">Employer Sponsored</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Next"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PaymentOption;
