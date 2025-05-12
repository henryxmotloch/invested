
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RssWidget() {
  const [isLoading, setIsLoading] = useState(true);
  
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

  return (
    <Card className="backdrop-blur-lg bg-white/10 mb-6">
      <CardHeader>
        <CardTitle>Education ROI News</CardTitle>
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
          <iframe
            src="https://rss.app/embed/v1/wall/CgU6FdKO3n3WYqCk"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            title="ROI Feed"
            className="rounded-md overflow-hidden"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
