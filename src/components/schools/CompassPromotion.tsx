
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CompassPromotion = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default CompassPromotion;
