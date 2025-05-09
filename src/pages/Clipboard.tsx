
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SchoolInfo } from "@/types/school";
import UserPreferences from "@/components/schools/UserPreferences";
import SchoolsList from "@/components/schools/SchoolsList";
import SchoolsLoading from "@/components/schools/SchoolsLoading";
import CompassPromotion from "@/components/schools/CompassPromotion";
import { Button } from "@/components/ui/button";

// Helper function to map location codes to province names
const getProvinceName = (code: string): string => {
  const provinceMap: { [key: string]: string } = {
    bc: "British Columbia",
    ab: "Alberta",
    sk: "Saskatchewan",
    mb: "Manitoba",
    on: "Ontario",
    qc: "Quebec",
    mt: "Maritimes",
    remote: "Remote Only",
    any: "Any Location"
  };
  return provinceMap[code] || code;
};

// Helper function to get program type display name
const getProgramTypeDisplay = (code: string): string => {
  switch (code) {
    case "certificate":
      return "Certificate";
    case "diploma":
      return "Diploma";
    case "degree":
      return "Degree";
    case "any":
      return "Any Type";
    default:
      return code;
  }
};

// Helper function to map budget codes to display text
const formatBudget = (budget: string): string => {
  switch (budget) {
    case "under-2k":
      return "Under $2,000";
    case "2-5k":
      return "$2,000 - $5,000";
    case "5-8k":
      return "$5,000 - $8,000";
    case "8k-plus":
      return "Over $8,000";
    case "any":
      return "Any Budget";
    default:
      return budget;
  }
};

// Helper function to get a program name from field
const getProgramNameFromField = (field: string): string => {
  switch (field) {
    case "business":
      return "Business Administration";
    case "computer-science":
      return "Computer Science";
    case "engineering":
      return "Engineering";
    case "medicine":
      return "Health Sciences";
    case "arts":
      return "Arts & Humanities";
    case "education":
      return "Education";
    case "law":
      return "Law";
    case "agriculture":
      return "Agriculture";
    case "culinary":
      return "Culinary Arts";
    case "any":
      return "Any Field";
    default:
      return field;
  }
};

const Clipboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [schools, setSchools] = useState<SchoolInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Get user preferences from state or use defaults
  const userName = state?.name || "Visitor";
  const userId = state?.userId || "";
  const userLocation = state?.location || "any";
  const userBudget = state?.budget || "any";
  const userProgramType = state?.programType || "any";
  const userField = state?.fieldOfStudy || "any";

  // Function to search for schools
  const searchSchools = async () => {
    setLoading(true);
    setSearchError(null);
    
    try {
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/search-schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({
          fieldOfStudy: userField,
          location: userLocation,
          budget: userBudget,
          programType: userProgramType
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to search schools");
      }
      
      console.log("Search results:", data);
      setSchools(data.schools || []);
    } catch (error) {
      console.error("Error searching schools:", error);
      setSearchError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error("There was an error searching for schools");
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  // Search for schools when component mounts or preferences change
  useEffect(() => {
    searchSchools();
  }, [userField, userLocation, userBudget, userProgramType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <SchoolsLoading />
        ) : (
          <>
            <UserPreferences 
              userField={getProgramNameFromField(userField)}
              userLocation={getProvinceName(userLocation)}
              userBudget={formatBudget(userBudget)}
              userProgramType={getProgramTypeDisplay(userProgramType)}
            />

            {searchError && (
              <div className="p-4 mb-6 bg-destructive/10 text-destructive rounded-md">
                <p>Error: {searchError}</p>
                <Button onClick={searchSchools} variant="outline" className="mt-2">
                  Try Again
                </Button>
              </div>
            )}

            {!searchError && schools.length > 0 ? (
              <>
                <SchoolsList schools={schools} />
                <CompassPromotion />
              </>
            ) : !searchError ? (
              <div className="text-center my-12 p-8 bg-white/10 backdrop-blur-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">No schools found matching your criteria</h2>
                <p className="mb-6">Try adjusting your preferences to find more results.</p>
                <Button 
                  onClick={() => navigate("/info-collection", {
                    state: {
                      name: userName,
                      userId: userId
                    }
                  })}
                  className="mr-4"
                >
                  Adjust Preferences
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
