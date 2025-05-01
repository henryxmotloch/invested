
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, ChartBar, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    setLoading(true);
    
    try {
      // Save the user's name to Supabase
      const userId = uuidv4();
      const { error } = await supabase
        .from("Users")
        .insert([
          { 
            "User ID": userId, 
            "Display name": name,
            "Created at": new Date().toISOString()
          }
        ]);
      
      if (error) {
        throw error;
      }
      
      toast.success("Welcome to InvestEd!");
      
      navigate("/info-collection", { 
        state: { 
          name,
          userId 
        }
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16 animate-fadeIn">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            InvestEd
          </h1>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fadeIn [animation-delay:200ms]">
            <h2 className="text-5xl font-bold leading-tight">
              Maximize Your ROI.
              <br />
              <span className="text-primary">Minimize Your Costs.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Smart financial planning for your educational journey. Get personalized insights and make informed decisions.
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-xl animate-fadeIn [animation-delay:400ms]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-2xl font-semibold mb-6">Get Started</h3>
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Setting up your account..." : "Begin Your Journey"}
              </Button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 animate-fadeIn [animation-delay:600ms]">
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <DollarSign className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Smart Investment</h3>
            <p className="text-muted-foreground">
              Make informed decisions about your educational investments
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <ChartBar className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">ROI Analysis</h3>
            <p className="text-muted-foreground">
              Compare programs and institutions based on real data
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <PiggyBank className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Cost Optimization</h3>
            <p className="text-muted-foreground">
              Find the best financial path for your education
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
