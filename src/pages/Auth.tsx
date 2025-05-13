
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract referral code from URL if present
  const referralCode = new URLSearchParams(location.search).get("ref");

  useEffect(() => {
    // Check if user came from a referral link and default to signup
    if (referralCode) {
      setIsSignUp(true);
    }
  }, [referralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate terms acceptance for signup
        if (!acceptTerms) {
          toast.error("You must accept the terms to create an account");
          setLoading(false);
          return;
        }

        // Sign up
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // If we have a referral code, store the referral
        if (referralCode && signUpData.user) {
          const { error: referralError } = await supabase
            .from('referrals')
            .insert({
              referrer_id: referralCode,
              referred_email: email,
            });
          
          if (referralError) {
            console.error("Error storing referral:", referralError);
            // Continue with signup even if referral tracking fails
          }
        }

        toast.success("Account created successfully! Please sign in.");
        setIsSignUp(false);
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Signed in successfully!");
        navigate("/");
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full backdrop-blur-lg bg-white/10 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>
        {referralCode && isSignUp && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-md">
            <p className="text-sm text-center">
              You were referred by a friend! Create an account to get started.
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          
          {isSignUp && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to receive educational updates and newsletters
              </Label>
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
