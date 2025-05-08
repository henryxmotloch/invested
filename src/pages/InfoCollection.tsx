
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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface LocationState {
  name: string;
  email?: string; // Make email optional since older links might not have it
  userId: string;
}

interface School {
  SchoolID: string;
  SchoolName: string;
  Location: string;
}

const InfoCollection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [location_, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [programType, setProgramType] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(false);

  console.log("InfoCollection state received:", state);

  useEffect(() => {
    const fetchSchools = async () => {
      setLoadingSchools(true);
      try {
        const { data, error } = await supabase
          .from("School")
          .select("SchoolID, SchoolName, Location")
          .limit(10);
          
        if (error) {
          console.error("Error fetching schools:", error);
        } else if (data) {
          setSchools(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoadingSchools(false);
      }
    };
    
    fetchSchools();
  }, []);

  if (!state?.name || !state?.userId) {
    console.warn("Missing required state data, redirecting to home");
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
          email: state.email, // Include email from state
          location: location_,
          budget,
          fieldOfStudy,
          programType,
          selectedSchoolId: selectedSchool
        }),
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to save preferences");
      }
      
      // Navigate to payment options page
      navigate("/payment-option", { 
        state: { 
          name: state.name,
          userId: state.userId,
          email: state.email,
          location: location_,
          budget,
          fieldOfStudy,
          programType,
          selectedSchoolId: selectedSchool
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

            <div className="space-y-2">
              <label className="text-lg font-medium">Select a School:</label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-full bg-white/40 border-white/20">
                  <SelectValue placeholder="Select a school..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-white/20">
                  {loadingSchools ? (
                    <SelectItem value="loading">Loading schools...</SelectItem>
                  ) : schools.length > 0 ? (
                    schools.map(school => (
                      <SelectItem key={school.SchoolID} value={school.SchoolID}>
                        {school.SchoolName} ({school.Location})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none">No schools available</SelectItem>
                  )}
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
