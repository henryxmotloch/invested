
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { SchoolInfo } from "@/types/school";
import { DEFAULT_SCHOOLS } from "@/data/schools";
import UserPreferences from "@/components/schools/UserPreferences";
import SchoolsList from "@/components/schools/SchoolsList";
import SchoolsLoading from "@/components/schools/SchoolsLoading";
import CompassPromotion from "@/components/schools/CompassPromotion";

const Clipboard = () => {
  const location = useLocation();
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
          <SchoolsLoading />
        ) : (
          <>
            <UserPreferences 
              userField={userField}
              userLocation={userLocation}
              userBudget={userBudget}
              userDuration={userDuration}
            />

            <SchoolsList schools={schools} />

            <CompassPromotion />
          </>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
