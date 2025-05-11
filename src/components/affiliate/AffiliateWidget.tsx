
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Referral {
  id: string;
  referred_email: string;
  created_at: string;
  status: string;
}

export default function AffiliateWidget() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
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
      .then(() => toast.success("Referral link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

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
            <div>
              <p className="text-sm text-muted-foreground">Your referral link:</p>
              <code className="text-xs bg-white/20 rounded p-1">{referralLink}</code>
            </div>
            <Button onClick={copyReferralLink} size="sm" variant="secondary">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Referrals:</p>
              <p className="font-semibold">{referrals.length}</p>
            </div>
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
