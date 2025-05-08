
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-500/20 p-3">
              <Check className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. You now have access to InvestEd Compass Premium.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Success;
