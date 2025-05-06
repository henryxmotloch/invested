
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SchoolInfo } from "@/types/school";
import { DEFAULT_SCHOOLS } from "@/data/schools";
import UserPreferences from "@/components/schools/UserPreferences";
import SchoolsList from "@/components/schools/SchoolsList";
import SchoolsLoading from "@/components/schools/SchoolsLoading";
import CompassPromotion from "@/components/schools/CompassPromotion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
    remote: "Remote Only"
  };
  return provinceMap[code] || code;
};

// Helper function to map budget codes to ranges
const getBudgetRange = (code: string): [number, number] => {
  switch (code) {
    case "under-2k":
      return [0, 2000];
    case "2-5k":
      return [2000, 5000];
    case "5-8k":
      return [5000, 8000];
    case "8k-plus":
      return [8000, 100000];
    default:
      return [0, 100000];
  }
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
    default:
      return "";
  }
};

const Clipboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [schools, setSchools] = useState<SchoolInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user preferences from state or use defaults
  const userName = state?.name || "Visitor";
  const userId = state?.userId || "";
  const userLocation = state?.location || "";
  const userBudget = state?.budget || "";
  const userProgramType = state?.programType || "";
  const userField = state?.fieldOfStudy || "";

  // Function to filter schools based on user preferences
  const filterSchools = () => {
    // Start with all schools from our dataset
    let filteredSchools = [...DEFAULT_SCHOOLS];
    
    // Apply filters only if they are selected (less restrictive search)
    if (userLocation && userLocation !== "remote") {
      filteredSchools = filteredSchools.filter(school => 
        school.province === userLocation
      );
    }
    
    // Filter by program/field if specified and not set to "other"
    if (userField && userField !== "other") {
      // Get programs related to the field
      const fieldPrograms = getRelatedPrograms(userField);
      filteredSchools = filteredSchools.filter(school => 
        fieldPrograms.some(program => 
          school.program.toLowerCase().includes(program.toLowerCase())
        )
      );
    }
    
    // Filter by budget if specified
    if (userBudget) {
      const [minBudget, maxBudget] = getBudgetRange(userBudget);
      filteredSchools = filteredSchools.filter(school =>
        school.tuitionDomestic >= minBudget && school.tuitionDomestic <= maxBudget
      );
    }

    // Filter by program type if specified
    if (userProgramType) {
      filteredSchools = filteredSchools.filter(school =>
        school.programType === userProgramType
      );
    }
    
    // Save user preferences to Supabase
    if (userId) {
      saveUserPreferences();
    }

    return filteredSchools;
  };

  // Save user preferences to Supabase
  const saveUserPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .insert([
          { 
            'User ID': Date.now().toString(), // Generate a unique ID based on timestamp
            'Display name': userName,
            'Field of Study': userField,
            'Preferred Campus Location': userLocation,
            'Budget Range': userBudget,
            'Payment Option': null
          }
        ]);
      
      if (error) {
        console.error('Error saving user preferences:', error);
      }
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  // Helper function to get related programs based on field
  const getRelatedPrograms = (field: string): string[] => {
    switch (field) {
      case "business":
        return ["Business", "Commerce", "Finance", "Marketing", "Management"];
      case "computer-science":
        return ["Computer Science", "Software", "IT", "Computing", "Web Development"];
      case "engineering":
        return ["Engineering", "Civil", "Mechanical", "Electrical", "Chemical"];
      case "medicine":
        return ["Medicine", "Health", "Nursing", "Pharmacy", "Medical"];
      case "arts":
        return ["Arts", "Humanities", "Design", "Fine Arts", "Music"];
      case "education":
        return ["Education", "Teaching", "Pedagogy"];
      case "law":
        return ["Law", "Legal Studies", "Justice"];
      default:
        return [field];
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
      default:
        return field;
    }
  };

  // Simulate a search with user preferences
  useEffect(() => {
    setLoading(true);
    
    // Simulate a search delay
    setTimeout(() => {
      try {
        const filteredResults = filterSchools();
        setSchools(filteredResults);
      } catch (error) {
        console.error("Error filtering schools:", error);
        toast.error("There was an error processing your search");
        setSchools([]);
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, [userField, userLocation, userBudget, userProgramType]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <SchoolsLoading />
        ) : (
          <>
            <UserPreferences 
              userField={userField ? getProgramNameFromField(userField) : "Any"}
              userLocation={userLocation ? getProvinceName(userLocation) : "Any"}
              userBudget={userBudget || "Any"}
              userProgramType={userProgramType ? getProgramTypeDisplay(userProgramType) : "Any"}
            />

            {schools.length > 0 ? (
              <>
                <SchoolsList schools={schools} />
                <CompassPromotion />
              </>
            ) : (
              <div className="text-center my-12 p-8 bg-white/10 backdrop-blur-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">No schools found matching your criteria</h2>
                <p className="mb-6">Try adjusting your preferences to find more results.</p>
                <Button 
                  onClick={() => navigate("/info-collection")}
                  className="mr-4"
                >
                  Adjust Preferences
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
