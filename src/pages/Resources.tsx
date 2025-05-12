
import RssWidget from "@/components/news/RssWidget";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Educational Resources</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Latest Education ROI News</h2>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest news and insights about educational ROI,
            college financing, and career outcomes.
          </p>
          <RssWidget />
        </div>
      </div>
    </div>
  );
};

export default Resources;
