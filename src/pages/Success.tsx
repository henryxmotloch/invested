
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, BarChart3, BookOpen, School } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Subscription {
  "Plan ID": string;
  "Status": string;
  "Start Date": string;
  "End Date": string;
}

interface Report {
  "Report ID": string;
  "Report Name": string;
  "Report Type": string;
  "Created At": string;
  "Data": {
    estimatedROI: string;
    timeToRecoup: string;
    potentialSalaryIncrease: string;
  };
}

const Success = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        // Fetch subscription data
        const { data: subData, error: subError } = await supabase
          .from("UserSubscriptions")
          .select("*")
          .eq("User ID", userId)
          .order("Created At", { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (subData && !subError) {
          setSubscription(subData);
        }
        
        // Fetch report data
        const { data: reportData, error: reportError } = await supabase
          .from("UserReports")
          .select("*")
          .eq("User ID", userId)
          .order("Created At", { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (reportData && !reportError) {
          setReport(reportData);
        }
      }
      
      setLoading(false);
    };
    
    fetchUserData();
  }, [userId]);
  
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
                    <p><span className="font-medium">Start Date:</span> {new Date(subscription["Start Date"]).toLocaleDateString()}</p>
                    <p><span className="font-medium">Expiration:</span> {new Date(subscription["End Date"]).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p>No subscription information available</p>
                )}
              </Card>
              
              <Card className="p-6 bg-white/5">
                <h3 className="flex items-center text-xl font-semibold mb-4">
                  <BarChart3 className="mr-2" /> ROI Report Highlights
                </h3>
                {report && report.Data ? (
                  <div className="space-y-2">
                    <p><span className="font-medium">Estimated ROI:</span> {report.Data.estimatedROI}</p>
                    <p><span className="font-medium">Time to Recoup:</span> {report.Data.timeToRecoup}</p>
                    <p><span className="font-medium">Potential Salary Increase:</span> {report.Data.potentialSalaryIncrease}</p>
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
