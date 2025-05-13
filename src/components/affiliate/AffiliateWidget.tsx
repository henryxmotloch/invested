
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Referral {
  id: string;
  referred_email: string;
  created_at: string;
  status: string;
}

export default function AffiliateWidget() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", user.id)
        .then(({ data, error }) => {
          if (error) {
            console.error("Error fetching referrals:", error);
            toast.error("Failed to load referrals");
          } else {
            setReferrals(data || []);
          }
        });
    }
  }, [user]);

  const referralLink = user ? `${window.location.origin}/auth?ref=${user.id}` : "";

  const copyReferralLink = () => {
    if (!referralLink) return;
    
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => toast.error("Failed to copy link"));
  };
  
  // Calculate progress to next reward tier
  const referralsCount = referrals.length;
  const nextTier = referralsCount < 5 ? 5 : referralsCount < 10 ? 10 : referralsCount < 25 ? 25 : 50;
  const currentTier = referralsCount < 5 ? 0 : referralsCount < 10 ? 5 : referralsCount < 25 ? 10 : 25;
  const progress = ((referralsCount - currentTier) / (nextTier - currentTier)) * 100;

  return (
    <Card className="backdrop-blur-lg bg-white/10 mb-6">
      <CardHeader>
        <CardTitle>Quick Affiliate Access</CardTitle>
        <CardDescription>
          Share your link and earn rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-2">
              <p className="text-sm text-muted-foreground">Your referral link:</p>
              <code className="text-xs bg-white/20 rounded p-1 block truncate">{referralLink}</code>
            </div>
            <Button onClick={copyReferralLink} size="sm" variant="secondary" className="min-w-[80px]">
              {isCopied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">Referrals: <span className="font-semibold">{referralsCount}</span></p>
              <p className="text-xs">{referralsCount}/{nextTier} to next tier</p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Earnings:</p>
              <p className="font-semibold">${referrals.length * 10}.00</p>
            </div>
            <Button variant="link" onClick={() => window.location.href = '/affiliate'}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
