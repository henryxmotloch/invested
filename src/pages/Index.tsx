
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, ChartBar, PiggyBank, Calculator, TrendingUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
      // Generate a unique user ID based on timestamp
      const userId = Date.now().toString();
      
      console.log("Submitting user data:", { name, email, userId });
      
      // Call our Edge Function to save the user data
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/save-user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Include Supabase anon key for authorization
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({ name, email, userId }),
      });
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing response:", e);
        throw new Error("Invalid response from server");
      }
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to save user information");
      }
      
      console.log("Save user response:", result);
      
      toast.success("Welcome to InvestEd!");
      
      // Make sure we properly redirect to info-collection with the necessary user data
      navigate("/info-collection", { 
        state: { 
          name,
          email,  // Pass email to the info collection page
          userId
        }
      });
    } catch (error) {
      console.error('Error saving user info:', error);
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
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Setting up your account..." : "Begin Your Journey"}
              </Button>
            </form>
          </div>
        </div>

        {/* Features Blocks - First Row */}
        <div className="grid md:grid-cols-3 gap-8 animate-fadeIn [animation-delay:600ms] mb-16">
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
        
        {/* New Section: Success Statistics */}
        <div className="py-16 animate-fadeIn [animation-delay:800ms]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Impact on Educational Decisions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who've made smarter educational investments with InvestEd's tools and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
              <p className="text-4xl font-bold text-primary">94%</p>
              <p className="text-muted-foreground mt-2">Users reporting better financial decisions</p>
            </div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
              <p className="text-4xl font-bold text-primary">$27K</p>
              <p className="text-muted-foreground mt-2">Average savings on education costs</p>
            </div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
              <p className="text-4xl font-bold text-primary">15K+</p>
              <p className="text-muted-foreground mt-2">School programs analyzed</p>
            </div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
              <p className="text-4xl font-bold text-primary">32%</p>
              <p className="text-muted-foreground mt-2">Higher expected ROI for our users</p>
            </div>
          </div>
        </div>
        
        {/* Features Blocks - Second Row */}
        <div className="grid md:grid-cols-3 gap-8 animate-fadeIn [animation-delay:1000ms] mb-16">
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <Calculator className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Financial Planning</h3>
            <p className="text-muted-foreground">
              Project your educational costs and future earning potential to make smarter investments
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <TrendingUp className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Career Trajectory</h3>
            <p className="text-muted-foreground">
              See how different educational choices impact your career growth and earning potential
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 transition-all duration-300 hover:bg-white/10">
            <Briefcase className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Industry Insights</h3>
            <p className="text-muted-foreground">
              Access data-driven insights about job markets and industry trends related to your field
            </p>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="py-16 animate-fadeIn [animation-delay:1200ms]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-8 transition-all duration-300 hover:bg-white/10">
              <p className="text-lg italic mb-6">
                "InvestEd helped me compare MBA programs and their real ROI. I ended up choosing a program that cost $45K less than my original choice, with better career outcomes!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Jessica D.</p>
                  <p className="text-sm text-muted-foreground">MBA Graduate</p>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-lg bg-white/5 rounded-xl p-8 transition-all duration-300 hover:bg-white/10">
              <p className="text-lg italic mb-6">
                "The ROI analysis tools helped me decide between an expensive private university and a more affordable state school. The data showed the state school would actually lead to better outcomes in my field!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Michael S.</p>
                  <p className="text-sm text-muted-foreground">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final Call to Action */}
        <div className="py-16 text-center animate-fadeIn [animation-delay:1400ms]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Educational Investments?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get started with InvestEd today and discover the true ROI of your educational choices.
            </p>
            <Button 
              onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="px-8"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
