
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Resources = () => {
  const navigate = useNavigate();
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = () => {
    if (subscribed) {
      toast.success("Thanks for subscribing to our newsletter!");
    } else {
      toast.error("Please check the subscription box first");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Educational Resources</h1>
        
        {/* Latest Education News - Moved to top and made smaller */}
        <div className="mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Latest Education News</h2>
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
            <img 
              src="/lovable-uploads/874a2a3e-b636-4be9-bd44-317daeecd44d.png" 
              alt="Latest Education News" 
              className="w-full rounded-md"
            />
          </div>
        </div>
        
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
            
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="newsletter" 
                checked={subscribed}
                onCheckedChange={(checked) => setSubscribed(checked as boolean)}
                required
              />
              <Label htmlFor="newsletter">
                Want updates on top ROI programs?
              </Label>
            </div>
            
            <Button 
              variant="outline"
              onClick={handleSubscribe}
              className="w-full md:w-auto"
            >
              {subscribed ? "Subscribe" : "Return Home"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
