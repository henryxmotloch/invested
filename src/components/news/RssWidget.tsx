
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RssWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  useEffect(() => {
    // Add a timeout to check if the iframe loaded properly
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("RSS feed might be taking too long to load");
        toast.info("RSS feed is loading. If it doesn't appear, please refresh the page.");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleIframeError = () => {
    console.log("RSS feed failed to load");
    setLoadError(true);
    setIsLoading(false);
    toast.error("Failed to load the news feed. Please try again later.");
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 mb-6">
      <CardHeader>
        <CardTitle>Marketing & Advertising News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[400px] w-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 backdrop-blur-sm">
              <div className="animate-pulse text-center">
                <p className="mb-2">Loading news feed...</p>
                <div className="h-2 w-24 bg-primary/30 rounded mx-auto"></div>
              </div>
            </div>
          )}
          
          {loadError ? (
            <div className="h-[400px] flex items-center justify-center bg-destructive/10 text-destructive rounded-md p-4">
              <div className="text-center">
                <p className="font-medium">Failed to load news feed</p>
                <p className="text-sm mt-2">Please check your connection and try again</p>
              </div>
            </div>
          ) : (
            <iframe
              src="https://rss.app/rss-feed?keyword=Marketing%20%2F%20advertising&region=US&lang=en"
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="yes"
              title="Marketing & Advertising News"
              className="rounded-md overflow-hidden"
              onLoad={() => setIsLoading(false)}
              onError={handleIframeError}
            ></iframe>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
