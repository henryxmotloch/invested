
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface SchoolInfo {
  name: string;
  logo: string;
  program: string;
  website: string;
  admissionGPA: number;
  admissionRate: number;
  tuitionDomestic: number;
  tuitionInternational: number;
  placementRate: number;
  averageIncome: number;
}

// Default schools data
const DEFAULT_SCHOOLS: SchoolInfo[] = [
  {
    name: "University of British Columbia",
    logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
    program: "Engineering Degree",
    website: "https://engineering.ubc.ca/",
    admissionGPA: 3.83,
    admissionRate: 43,
    tuitionDomestic: 7846,
    tuitionInternational: 60622,
    placementRate: 95,
    averageIncome: 80000
  },
  {
    name: "British Columbia Institute of Technology (BCIT)",
    logo: "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
    program: "Information Technology Management",
    website: "https://www.bcit.ca/",
    admissionGPA: 3.25,
    admissionRate: 50,
    tuitionDomestic: 5500,
    tuitionInternational: 18500,
    placementRate: 92,
    averageIncome: 70000
  },
  {
    name: "Simon Fraser University (SFU)",
    logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
    program: "Business Administration",
    website: "https://beedie.sfu.ca/",
    admissionGPA: 3.65,
    admissionRate: 40,
    tuitionDomestic: 7200,
    tuitionInternational: 33000,
    placementRate: 90,
    averageIncome: 75000
  }
];

const Clipboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [schools, setSchools] = useState<SchoolInfo[]>(DEFAULT_SCHOOLS);
  const [loading, setLoading] = useState(false);

  // Get user preferences from state or use defaults
  const userName = state?.name || "Visitor";
  const userLocation = state?.location || "N/A";
  const userBudget = state?.budget || "N/A";
  const userDuration = state?.duration || "N/A";
  const userField = state?.field || "N/A";

  useEffect(() => {
    // Process user preferences on load
    if (state?.field || state?.location || state?.budget) {
      setLoading(true);
      
      // Simulate a search with user preferences
      setTimeout(() => {
        // Create tailored results based on user input
        const customizedSchools = DEFAULT_SCHOOLS.map(school => {
          // Make a deep copy to avoid modifying the original
          const customSchool = { ...school };
          
          // Adjust school properties based on user field preference if provided
          if (state?.field) {
            customSchool.program = state.field;
            
            // Adjust GPA based on field
            if (state.field.includes("Engineering")) {
              customSchool.admissionGPA = 3.9;
            } else if (state.field.includes("Business")) {
              customSchool.admissionGPA = 3.7;
            } else if (state.field.includes("Arts")) {
              customSchool.admissionGPA = 3.3;
            }
          }
          
          // Adjust tuition based on user budget if provided
          if (state?.budget) {
            const budgetNum = parseInt(state.budget.replace(/[^\d]/g, ''), 10);
            if (!isNaN(budgetNum)) {
              if (budgetNum < 10000) {
                customSchool.tuitionDomestic = Math.max(4500, customSchool.tuitionDomestic * 0.9);
                customSchool.tuitionInternational = Math.max(15000, customSchool.tuitionInternational * 0.85);
              } else if (budgetNum > 50000) {
                customSchool.tuitionDomestic = customSchool.tuitionDomestic * 1.1;
                customSchool.tuitionInternational = customSchool.tuitionInternational * 1.15;
              }
            }
          }
          
          return customSchool;
        });
        
        setSchools(customizedSchools);
        setLoading(false);
      }, 1500);
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className="max-w-2xl mx-auto mb-8">
              <div className="mt-4 text-sm text-white/70">
                <p className="mb-2">Showing results based on:</p>
                <ul className="list-disc list-inside">
                  <li>Field of Study: {userField}</li>
                  <li>Location: {userLocation}</li>
                  <li>Budget: {userBudget}</li>
                  <li>Duration: {userDuration}</li>
                </ul>
              </div>
            </div>

            {schools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {schools.map((school, index) => (
                  <Card key={index} className="overflow-hidden backdrop-blur-lg bg-white/10">
                    <div className="p-6 space-y-6">
                      <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4">
                        <img 
                          src={school.logo} 
                          alt={`${school.name} Logo`}
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold">{school.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Program:</span> {school.program}</p>
                        <p>
                          <span className="font-semibold">Website:</span>{' '}
                          <a href={school.website} target="_blank" rel="noopener noreferrer" 
                            className="text-primary hover:underline">
                            {school.website}
                          </a>
                        </p>
                        <p><span className="font-semibold">Admission GPA:</span> {school.admissionGPA}</p>
                        <p><span className="font-semibold">Admission Rate:</span> {school.admissionRate}%</p>
                        <p><span className="font-semibold">Tuition (Domestic):</span> ${school.tuitionDomestic.toLocaleString()}</p>
                        <p><span className="font-semibold">Tuition (International):</span> ${school.tuitionInternational.toLocaleString()}</p>
                        <p><span className="font-semibold">Job Placement Rate:</span> {school.placementRate}%</p>
                        <p><span className="font-semibold">Average Income:</span> ${school.averageIncome.toLocaleString()}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center my-12">
                <p className="text-xl">No schools found matching your criteria.</p>
              </div>
            )}

            <Card className="max-w-4xl mx-auto p-8 backdrop-blur-lg bg-white/10">
              <h2 className="text-2xl font-bold mb-4">Get Your Personalized Compass</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Take your planning to the next level with Compass, a detailed information dashboard 
                tailored to your chosen program and institution. Discover insights about admissions, 
                tuition, career outcomes, and more—all in one place!
              </p>
              <Button 
                className="w-full md:w-auto"
                onClick={() => navigate("/cart")}
              >
                View Cart & Purchase Compass
              </Button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
