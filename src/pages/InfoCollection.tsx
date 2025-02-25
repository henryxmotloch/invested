
import { useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LocationState {
  name: string;
  email: string;
}

const InfoCollection = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  // Redirect to home if no state is present
  if (!state?.name || !state?.email) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h1 className="text-3xl font-bold mb-6">Welcome, {state.name}!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We'll help you make informed decisions about your educational investments. Let's start by collecting some information.
          </p>
          
          {/* Coming soon placeholder */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Information collection form coming in next steps...</p>
            <Button variant="secondary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InfoCollection;
