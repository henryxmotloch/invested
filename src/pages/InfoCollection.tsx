
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
}

const InfoCollection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [location_, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [programType, setProgramType] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  if (!state?.name) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Navigate directly to clipboard page with user preferences
      navigate("/clipboard", { 
        state: { 
          name: state.name,
          userId: state.userId,
          location: location_,
          budget,
          programType,
          fieldOfStudy
        } 
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
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
