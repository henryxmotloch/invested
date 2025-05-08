
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, BarChart3, BookOpen, School, ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

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
  const [selectedROITab, setSelectedROITab] = useState("overview");

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
          console.log("Subscription data:", subData);
        } else {
          console.error("Error fetching subscription:", subError);
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
            console.log("Report data:", reportData);
          } else {
            console.error("Error fetching report:", reportError);
          }
        } else {
          console.error("Error fetching purchase or no ReportID:", purchaseError);
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

  const getROIDetails = () => {
    switch (selectedROITab) {
      case "overview":
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p><span className="font-medium">Estimated ROI:</span></p>
              <p className="text-green-500 flex items-center"><ArrowUp className="h-4 w-4 mr-1" />145%</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">Time to Recoup:</span></p>
              <p>18 months</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">Potential Salary Increase:</span></p>
              <p>$24,500</p>
            </div>
          </div>
        );
      case "projections":
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p><span className="font-medium">5-Year Projection:</span></p>
              <p>$125,000</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">10-Year Projection:</span></p>
              <p>$175,000</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">Career Ceiling Increase:</span></p>
              <p className="text-green-500">+35%</p>
            </div>
          </div>
        );
      case "industry":
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p><span className="font-medium">Industry Growth Rate:</span></p>
              <p className="text-green-500">12% annually</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">Job Openings (5yr):</span></p>
              <p>45,000+</p>
            </div>
            <div className="flex justify-between">
              <p><span className="font-medium">Mid-Career Switch Ease:</span></p>
              <p>High</p>
            </div>
          </div>
        );
      default:
        return null;
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
                    <div className="flex justify-between">
                      <p><span className="font-medium">Plan:</span></p>
                      <p>Premium</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Status:</span></p>
                      <p>{subscription.Status}</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Start Date:</span></p>
                      <p>{getFormattedDate(subscription.StartDate)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Expiration:</span></p>
                      <p>{getFormattedDate(subscription.EndDate)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Billing Frequency:</span></p>
                      <p>Monthly</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Next Billing:</span></p>
                      <p>{getFormattedDate(new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString())}</p>
                    </div>
                    <div className="flex justify-between">
                      <p><span className="font-medium">Payment Method:</span></p>
                      <p>●●●● 4242</p>
                    </div>
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
                  <div>
                    <div className="mb-4">
                      <p><span className="font-medium">Report:</span> {report.ReportName || "Education ROI Analysis"}</p>
                      <p className="text-sm text-muted-foreground">{report.Description || "Comprehensive analysis of your educational investment return"}</p>
                    </div>
                    
                    <div className="mb-4">
                      <RadioGroup 
                        value={selectedROITab} 
                        onValueChange={setSelectedROITab}
                        className="flex space-x-2 mb-4 justify-center"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="overview" id="overview" className="sr-only" />
                          <label 
                            htmlFor="overview" 
                            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${selectedROITab === "overview" ? "bg-white/20" : "hover:bg-white/10"}`}
                          >
                            Overview
                          </label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="projections" id="projections" className="sr-only" />
                          <label 
                            htmlFor="projections" 
                            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${selectedROITab === "projections" ? "bg-white/20" : "hover:bg-white/10"}`}
                          >
                            Projections
                          </label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="industry" id="industry" className="sr-only" />
                          <label 
                            htmlFor="industry" 
                            className={`px-3 py-1 text-sm rounded-md cursor-pointer ${selectedROITab === "industry" ? "bg-white/20" : "hover:bg-white/10"}`}
                          >
                            Industry
                          </label>
                        </div>
                      </RadioGroup>
                      
                      {getROIDetails()}
                      
                      <div className="text-sm text-right mt-4">
                        <button 
                          className="text-secondary-foreground/70 hover:text-secondary-foreground underline"
                          onClick={() => toast.success("Full report will be emailed to you within 24 hours")}
                        >
                          View Full Report
                        </button>
                      </div>
                    </div>
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
