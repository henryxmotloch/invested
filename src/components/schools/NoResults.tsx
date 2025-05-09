
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NoResultsProps {
  userName: string;
  userId: string;
}

const NoResults = ({ userName, userId }: NoResultsProps) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default NoResults;
