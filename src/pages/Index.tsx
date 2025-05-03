
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const Index = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    try {
      // Generate a unique ID for this user
      const userId = uuidv4();
      
      console.log("Submitting user data:", { name, userId });
      
      // Call our Edge Function to save the user data
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/save-user-info", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({ name, userId }),
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
      
      // Navigate to the info collection page
      navigate("/info-collection", { 
        state: { 
          name,
          userId 
        } 
      });
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">InvestEd</h1>
          <p className="text-lg text-white/80">Your education investment advisor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-medium text-white">
              What's your name?
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/30 border-white/20 text-white placeholder:text-white/50"
              placeholder="Enter your name"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white text-primary hover:bg-white/90"
          >
            Begin Your Journey
          </Button>
        </form>

        <p className="mt-8 text-sm text-center text-white/70">
          By continuing, you're agreeing to our Terms of Service and Privacy Policy.
        </p>
      </Card>
    </div>
  );
};

export default Index;
