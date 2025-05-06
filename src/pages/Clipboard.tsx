
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SchoolInfo } from "@/types/school";
import UserPreferences from "@/components/schools/UserPreferences";
import SchoolsList from "@/components/schools/SchoolsList";
import SchoolsLoading from "@/components/schools/SchoolsLoading";
import CompassPromotion from "@/components/schools/CompassPromotion";
import { Button } from "@/components/ui/button";

// Sample school data covering multiple provinces
const SAMPLE_SCHOOLS: SchoolInfo[] = [
  {
    name: "University of British Columbia",
    logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
    program: "Computer Science",
    website: "https://cs.ubc.ca/",
    province: "bc",
    admissionGPA: 3.7,
    admissionRate: 15,
    tuitionDomestic: 5500,
    tuitionInternational: 42000,
    placementRate: 92,
    averageIncome: 85000,
    programDuration: "4 years"
  },
  {
    name: "University of Toronto",
    logo: "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
    program: "Computer Engineering",
    website: "https://engineering.utoronto.ca/",
    province: "on",
    admissionGPA: 3.8,
    admissionRate: 12,
    tuitionDomestic: 6400,
    tuitionInternational: 58000,
    placementRate: 95,
    averageIncome: 92000,
    programDuration: "4 years"
  },
  {
    name: "McGill University",
    logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
    program: "Business Administration",
    website: "https://www.mcgill.ca/desautels/",
    province: "qc",
    admissionGPA: 3.6,
    admissionRate: 25,
    tuitionDomestic: 4200,
    tuitionInternational: 45000,
    placementRate: 90,
    averageIncome: 78000,
    programDuration: "4 years"
  },
  {
    name: "University of Alberta",
    logo: "/placeholder.svg",
    program: "Engineering",
    website: "https://www.ualberta.ca/engineering/",
    province: "ab",
    admissionGPA: 3.5,
    admissionRate: 35,
    tuitionDomestic: 5800,
    tuitionInternational: 32000,
    placementRate: 88,
    averageIncome: 82000,
    programDuration: "4 years"
  },
  {
    name: "University of Saskatchewan",
    logo: "/placeholder.svg",
    program: "Agriculture",
    website: "https://agbio.usask.ca/",
    province: "sk",
    admissionGPA: 3.2,
    admissionRate: 60,
    tuitionDomestic: 7200,
    tuitionInternational: 28000,
    placementRate: 85,
    averageIncome: 68000,
    programDuration: "4 years"
  },
  {
    name: "Dalhousie University",
    logo: "/placeholder.svg",
    program: "Marine Biology",
    website: "https://www.dal.ca/faculty/science/biology.html",
    province: "mt",
    admissionGPA: 3.4,
    admissionRate: 45,
    tuitionDomestic: 8600,
    tuitionInternational: 25000,
    placementRate: 80,
    averageIncome: 65000,
    programDuration: "4 years"
  },
  {
    name: "University of Manitoba",
    logo: "/placeholder.svg",
    program: "Health Sciences",
    website: "https://umanitoba.ca/health-sciences/",
    province: "mb",
    admissionGPA: 3.6,
    admissionRate: 40,
    tuitionDomestic: 5100,
    tuitionInternational: 22000,
    placementRate: 90,
    averageIncome: 75000,
    programDuration: "4 years"
  },
  {
    name: "Algonquin College",
    logo: "/placeholder.svg",
    program: "Software Development",
    website: "https://www.algonquincollege.com/",
    province: "on",
    admissionGPA: 2.8,
    admissionRate: 75,
    tuitionDomestic: 3500,
    tuitionInternational: 15000,
    placementRate: 85,
    averageIncome: 68000,
    programDuration: "2 years"
  },
  {
    name: "BCIT",
    logo: "/placeholder.svg",
    program: "Web Development",
    website: "https://www.bcit.ca/",
    province: "bc",
    admissionGPA: 3.0,
    admissionRate: 65,
    tuitionDomestic: 4200,
    tuitionInternational: 16500,
    placementRate: 92,
    averageIncome: 72000,
    programDuration: "2 years"
  },
  {
    name: "Conestoga College",
    logo: "/placeholder.svg",
    program: "Business",
    website: "https://www.conestogac.on.ca/",
    province: "on",
    admissionGPA: 2.6,
    admissionRate: 80,
    tuitionDomestic: 2900,
    tuitionInternational: 14000,
    placementRate: 80,
    averageIncome: 55000,
    programDuration: "3 years"
  }
];

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

// Helper function to map duration codes to program durations
const getDurationRange = (code: string): string => {
  switch (code) {
    case "6-months":
      return "6 months";
    case "1-year":
      return "1 year";
    case "2-years":
      return "2 years";
    case "4-years":
      return "4 years";
    case "longer":
      return "More than 4 years";
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
  const userLocation = state?.location || "";
  const userBudget = state?.budget || "";
  const userDuration = state?.duration || "";
  const userField = state?.fieldOfStudy || "";

  // Function to filter schools based on user preferences
  const filterSchools = () => {
    // Start with all sample schools
    let filteredSchools = [...SAMPLE_SCHOOLS];
    
    // Filter by province/location if specified
    if (userLocation && userLocation !== "remote") {
      filteredSchools = filteredSchools.filter(school => 
        school.province === userLocation
      );
    }
    
    // Filter by program/field if specified
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
    
    // Adapt search results with user preferences
    return filteredSchools.map(school => {
      // Create a copy to avoid modifying the original
      const customizedSchool = { ...school };
      
      // Adjust program if needed
      if (userField && userField !== "other") {
        customizedSchool.program = getProgramNameFromField(userField);
      }
      
      // Adjust program duration if specified
      if (userDuration) {
        customizedSchool.programDuration = getDurationRange(userDuration);
      }
      
      return customizedSchool;
    });
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
  }, [userField, userLocation, userBudget, userDuration]);

  const handleAddToCart = () => {
    navigate("/cart");
  };

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
              userDuration={userDuration ? getDurationRange(userDuration) : "Any"}
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
