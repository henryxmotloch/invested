
import { useLocation, useNavigate } from "react-router-dom";
import { SchoolsLoading } from "@/components/schools/SchoolsLoading";
import UserPreferences from "@/components/schools/UserPreferences";
import SearchAlerts from "@/components/schools/SearchAlerts";
import SearchResults from "@/components/schools/SearchResults";
import NoResults from "@/components/schools/NoResults";
import { useSchoolSearch } from "@/hooks/useSchoolSearch";
import { 
  getProvinceName, 
  getProgramTypeDisplay, 
  formatBudget, 
  getProgramNameFromField 
} from "@/utils/formatHelpers";

const Clipboard = () => {
  const location = useLocation();
  const state = location.state;

  // Get user preferences from state or use defaults
  const userName = state?.name || "Visitor";
  const userId = state?.userId || "";
  const userLocation = state?.location || "any";
  const userBudget = state?.budget || "any";
  const userProgramType = state?.programType || "any";
  const userField = state?.fieldOfStudy || "any";
  const userPaymentOption = state?.paymentOption || "";

  // Use our custom hook for school search functionality
  const { 
    schools, 
    loading, 
    searchError, 
    searchSource, 
    searchMessage, 
    searchSchools 
  } = useSchoolSearch({
    userField,
    userLocation,
    userBudget,
    userProgramType
  });

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

            <SearchAlerts
              searchSource={searchSource}
              searchMessage={searchMessage}
              searchError={searchError}
              onRetry={searchSchools}
            />

            {!searchError && schools.length > 0 ? (
              <SearchResults schools={schools} />
            ) : !searchError ? (
              <NoResults userName={userName} userId={userId} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Clipboard;
