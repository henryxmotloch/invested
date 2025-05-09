import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Users, DollarSign, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface Referral {
  id: string;
  referred_email: string;
  created_at: string;
  status: string;
}

const Affiliate = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user && !loading) {
      toast.error("You need to be logged in to access the affiliate program");
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Fetch referral data
  useEffect(() => {
    const fetchReferrals = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("referrals")
          .select("*")
          .eq("referrer_id", user.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        
        setReferrals(data || []);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        toast.error("Failed to load your referrals");
      } finally {
        setLoading(false);
      }
    };
    
    fetchReferrals();
  }, [user]);

  // Generate referral link
  const getReferralLink = () => {
    if (!user) return "";
    
    // Use window.location.origin to make it work in any environment
    return `${window.location.origin}/auth?ref=${user.id}`;
  };

  // Handle copy to clipboard
  const copyReferralLink = () => {
    const link = getReferralLink();
    navigator.clipboard.writeText(link)
      .then(() => toast.success("Referral link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  // Calculate earnings (mock data - $10 per referral)
  const calculateEarnings = () => {
    return referrals.length * 10;
  };

  if (!user) {
    return <div className="container py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Affiliate Program</h1>
        
        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-lg bg-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Referrals</p>
                  <h3 className="text-2xl font-bold">{referrals.length}</h3>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Estimated Earnings</p>
                  <h3 className="text-2xl font-bold">${calculateEarnings()}.00</h3>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="backdrop-blur-lg bg-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold">
                    {referrals.length > 0 ? "25%" : "0%"}
                  </h3>
                </div>
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Referral Link Card */}
        <Card className="backdrop-blur-lg bg-white/10 mb-8">
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>
              Share this link with friends and earn rewards when they sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input 
                value={getReferralLink()} 
                readOnly 
                className="bg-white/20 border-white/20 text-white"
              />
              <Button onClick={copyReferralLink} variant="secondary">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              You earn $10 in account credit for each friend who signs up using your link.
            </p>
          </CardFooter>
        </Card>
        
        {/* Referrals Table */}
        <Card className="backdrop-blur-lg bg-white/10">
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>
              Track the status of your referrals and earned rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading your referrals...</p>
            ) : referrals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  You haven't referred anyone yet!
                </p>
                <p className="text-sm">
                  Share your referral link with friends to start earning rewards.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell>{referral.referred_email}</TableCell>
                      <TableCell>
                        {new Date(referral.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span className={`capitalize ${
                          referral.status === 'completed' 
                            ? 'text-green-400' 
                            : 'text-yellow-400'
                        }`}>
                          {referral.status}
                        </span>
                      </TableCell>
                      <TableCell>${10}.00</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter>
            {referrals.length > 0 && (
              <Button variant="outline" disabled className="ml-auto">
                Request Payout (Coming Soon)
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Affiliate;
