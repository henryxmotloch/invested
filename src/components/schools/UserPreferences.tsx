
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserPreferencesProps {
  userField: string;
  userLocation: string;
  userBudget: string;
  userDuration: string;
}

const UserPreferences = ({ userField, userLocation, userBudget, userDuration }: UserPreferencesProps) => {
  const navigate = useNavigate();
  
  // Function to format budget display
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
      default:
        return budget;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-lg p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Button 
          variant="outline" 
          onClick={() => navigate("/info-collection")}
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
            <span className="font-semibold">Budget:</span> {formatBudget(userBudget)}
          </div>
          <div className="bg-white/5 p-3 rounded">
            <span className="font-semibold">Duration:</span> {userDuration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
