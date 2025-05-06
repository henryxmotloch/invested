
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface UserPreferencesProps {
  userField: string;
  userLocation: string;
  userBudget: string;
  userProgramType: string;
}

const UserPreferences = ({ userField, userLocation, userBudget, userProgramType }: UserPreferencesProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  
  const handleRefineSearch = () => {
    // Preserve the user data when navigating back to info collection
    navigate("/info-collection", { 
      state: { 
        name: state.name,
        userId: state.userId
      }
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-lg p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Button 
          variant="outline" 
          onClick={handleRefineSearch}
          className="bg-white/20"
        >
          Refine Search
        </Button>
      </div>
      
      <div className="mt-4 text-sm">
        <p className="mb-2 text-lg">Showing results based on:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-3 rounded">
            <span className="font-semibold">Field of Study:</span> {userField}
          </div>
          <div className="bg-white/5 p-3 rounded">
            <span className="font-semibold">Location:</span> {userLocation}
          </div>
          <div className="bg-white/5 p-3 rounded">
            <span className="font-semibold">Budget:</span> {userBudget}
          </div>
          <div className="bg-white/5 p-3 rounded">
            <span className="font-semibold">Program Type:</span> {userProgramType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
