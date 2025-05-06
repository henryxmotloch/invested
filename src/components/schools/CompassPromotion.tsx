
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CompassPromotion = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="max-w-4xl mx-auto p-8 backdrop-blur-lg bg-white/10 mt-12">
      <h2 className="text-2xl font-bold mb-4">Get Your Personalized Education Compass</h2>
      <p className="mb-6 text-lg text-muted-foreground">
        Take your planning to the next level with our Compass Premium package. Access detailed information about admissions, 
        tuition assistance options, career outcomes, and personalized recommendations—all in one comprehensive report!
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Button 
          className="w-full md:w-auto"
          onClick={() => navigate("/cart")}
          variant="default"
        >
          Get Full Reports
        </Button>
        <Button 
          className="w-full md:w-auto"
          onClick={() => navigate("/info-collection")}
          variant="outline"
        >
          Refine Search
        </Button>
      </div>
    </Card>
  );
};

export default CompassPromotion;
