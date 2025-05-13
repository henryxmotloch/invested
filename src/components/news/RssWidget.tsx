
import { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RssWidget() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const rssUrl = 'https://rss.app/rss-feed?keyword=Marketing%20%2F%20advertising&region=US&lang=en';

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const reloadFeed = () => {
    setLoading(true);
    setError(false);
    
    // Reset iframe src to force reload
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = rssUrl;
      }, 100);
    }
    
    // Set timeout for loading
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 10000);
  };

  useEffect(() => {
    // Set timeout for initial loading
    timeoutRef.current = window.setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
      }
    }, 10000);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-[400px] relative rounded-md overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin mx-auto mb-2" />
            <p className="text-sm">Loading latest news...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
          <div className="text-center max-w-md mx-auto p-4">
            <AlertCircle className="h-10 w-10 mx-auto mb-2 text-red-500" />
            <h3 className="font-bold mb-1">Failed to load news feed</h3>
            <p className="text-sm mb-4">We couldn't load the latest education news. Please check your internet connection and try again.</p>
            <Button onClick={reloadFeed} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={rssUrl}
        className="w-full h-full border-0"
        title="RSS Feed"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
