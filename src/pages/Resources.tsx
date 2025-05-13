
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Educational Resources</h1>
        
        <div className="mt-12 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg flex-1">
            <h3 className="text-xl font-semibold mb-3">Ready to compare schools?</h3>
            <p className="mb-4">
              Use our tools to find schools that match your preferences and offer the best return on investment.
            </p>
            <Button 
              onClick={() => navigate("/info-collection")}
              className="w-full md:w-auto"
            >
              Find Schools
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg flex-1">
            <h3 className="text-xl font-semibold mb-3">Need more information?</h3>
            <p className="mb-4">
              Visit our FAQ section to learn more about how we calculate ROI and help you make informed decisions.
            </p>
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full md:w-auto"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
