
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

interface LocationState {
  name: string;
  email: string;
}

const InfoCollection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [location_, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  
  // Temporarily using default name for demonstration
  const userName = state?.name || "Visitor";
  const userEmail = state?.email || "visitor@example.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/clipboard", { 
      state: { 
        name: userName,
        email: userEmail,
        location: location_,
        budget,
        duration
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h1 className="text-3xl font-bold mb-6">Welcome, henry!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Enter your goals so the InvestEd compass can point you to success...
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-medium">Preferred Campus Location:</label>
              <Select value={location_} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select a location..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
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
                  <SelectItem value="under-2k">Under $2,000</SelectItem>
                  <SelectItem value="2-5k">$2,500 - $5,000</SelectItem>
                  <SelectItem value="5-8k">$5,000 - $8,000</SelectItem>
                  <SelectItem value="8k-plus">Over $8,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium">How Long Would You Like to Study?</label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select duration..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  <SelectItem value="6-months">6 months or less</SelectItem>
                  <SelectItem value="1-year">1 year</SelectItem>
                  <SelectItem value="2-years">2 years</SelectItem>
                  <SelectItem value="4-years">4 years</SelectItem>
                  <SelectItem value="longer">More than 4 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default InfoCollection;
