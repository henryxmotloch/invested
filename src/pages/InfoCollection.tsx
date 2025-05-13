
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
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import RssWidget from "@/components/news/RssWidget";

interface LocationState {
  name: string;
  email?: string;
  userId: string;
}

const InfoCollection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [location_, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [programType, setProgramType] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  console.log("InfoCollection state received:", state);

  if (!state?.name || !state?.userId) {
    console.warn("Missing required state data, redirecting to home");
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentOption) {
      toast.error("Please select a payment option");
      return;
    }

    if (!subscribed) {
      toast.error("Please agree to receive updates on top ROI programs");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update user preferences in database
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/save-user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({
          userId: state.userId,
          name: state.name,
          email: state.email,
          location: location_,
          budget,
          fieldOfStudy,
          programType,
          paymentOption,
          subscribed
        }),
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to save preferences");
      }
      
      // Navigate directly to clipboard page with all the info
      navigate("/clipboard", { 
        state: { 
          name: state.name,
          userId: state.userId,
          email: state.email,
          location: location_,
          budget,
          fieldOfStudy,
          programType,
          paymentOption,
          subscribed
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 flex items-center justify-center flex-col">
        <Card className="p-8 backdrop-blur-lg bg-white/10 w-full max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, {state.name}!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Enter your goals so the InvestEd compass can point you to success...
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium">Field of Study:</label>
              <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select your field of study..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="any">Any Field</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="law">Law</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="culinary">Culinary Arts</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-lg font-medium">Preferred Campus Location:</label>
              <Select value={location_} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select a location..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="any">Any Location</SelectItem>
                  <SelectItem value="bc">British Columbia</SelectItem>
                  <SelectItem value="ab">Alberta</SelectItem>
                  <SelectItem value="sk">Saskatchewan</SelectItem>
                  <SelectItem value="mb">Manitoba</SelectItem>
                  <SelectItem value="on">Ontario</SelectItem>
                  <SelectItem value="qc">Quebec</SelectItem>
                  <SelectItem value="mt">Maritimes</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium">Budget Range:</label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select your budget..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="any">Any Budget</SelectItem>
                  <SelectItem value="under-2k">Under $2,000</SelectItem>
                  <SelectItem value="2-5k">$2,000 - $5,000</SelectItem>
                  <SelectItem value="5-8k">$5,000 - $8,000</SelectItem>
                  <SelectItem value="8k-plus">Over $8,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium">Program Type:</label>
              <Select value={programType} onValueChange={setProgramType}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select program type..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="any">Any Type</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="degree">Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mt-8">
              <label className="text-lg font-medium">Payment Method:</label>
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

            <div className="flex items-center space-x-2 pt-4 pb-2">
              <Checkbox 
                id="newsletter" 
                checked={subscribed}
                onCheckedChange={(checked) => setSubscribed(checked as boolean)}
                required
              />
              <Label htmlFor="newsletter" className="font-medium">
                Want updates on top ROI programs?
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Next"}
            </Button>
          </form>
        </Card>

        {/* RSS Widget */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Latest Education News</h2>
            <RssWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCollection;
