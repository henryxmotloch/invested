
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, BarChart3, BookOpen, School } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface SubscriptionData {
  "SubscriptionID": string;
  "CustomerID": string;
  "PlanID": string;
  "StartDate": string;
  "EndDate": string;
  "Status": string;
}

interface ReportData {
  "ReportID": string;
  "ReportName": string;
  "Description": string;
  "AccessLevel": string;
  "PublishedDate": string;
  "Price": number;
}

const Success = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from("Subscription")
          .select("*")
          .eq("CustomerID", userId)
          .order("StartDate", { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (subData && !subError) {
          setSubscription(subData as SubscriptionData);
        }
        
        // Fetch report data via the Purchase table to find reports the user has access to
        const { data: purchaseData, error: purchaseError } = await supabase
          .from("Purchase")
          .select("*")
          .eq("CustomerID", userId)
          .order("PurchaseDate", { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (purchaseData && !purchaseError && purchaseData.ReportID) {
          // Now get the report details
          const { data: reportData, error: reportError } = await supabase
            .from("Report")
            .select("*")
            .eq("ReportID", purchaseData.ReportID)
            .maybeSingle();
            
          if (reportData && !reportError) {
            setReport(reportData as ReportData);
          }
        }
      }
      
      setLoading(false);
    };
    
    fetchUserData();
  }, [userId]);
  
  const getFormattedDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto p-8 backdrop-blur-lg bg-white/10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-500/20 p-3">
              <Check className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your purchase. You now have access to InvestEd Compass Premium.
          </p>
          
          {loading ? (
            <div className="text-center p-4">Loading your information...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="p-6 bg-white/5">
                <h3 className="flex items-center text-xl font-semibold mb-4">
                  <BookOpen className="mr-2" /> Subscription Details
                </h3>
                {subscription ? (
                  <div className="space-y-2">
                    <p><span className="font-medium">Plan:</span> Premium</p>
                    <p><span className="font-medium">Status:</span> {subscription.Status}</p>
                    <p><span className="font-medium">Start Date:</span> {getFormattedDate(subscription.StartDate)}</p>
                    <p><span className="font-medium">Expiration:</span> {getFormattedDate(subscription.EndDate)}</p>
                  </div>
                ) : (
                  <p>No subscription information available</p>
                )}
              </Card>
              
              <Card className="p-6 bg-white/5">
                <h3 className="flex items-center text-xl font-semibold mb-4">
                  <BarChart3 className="mr-2" /> ROI Report Highlights
                </h3>
                {report ? (
                  <div className="space-y-2">
                    <p><span className="font-medium">Report:</span> {report.ReportName}</p>
                    <p><span className="font-medium">Description:</span> {report.Description}</p>
                    <p><span className="font-medium">Estimated ROI:</span> 145%</p>
                    <p><span className="font-medium">Time to Recoup:</span> 18 months</p>
                    <p><span className="font-medium">Potential Salary Increase:</span> $24,500</p>
                  </div>
                ) : (
                  <p>No report data available</p>
                )}
              </Card>
            </div>
          )}
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/30 hover:bg-white/30"
              onClick={() => window.location.href = "/"}
            >
              <School className="mr-2" />
              Explore More Education Opportunities
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Success;
