
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RssWidget() {
  return (
    <Card className="backdrop-blur-lg bg-white/10 mb-6">
      <CardHeader>
        <CardTitle>Education ROI News</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          src="https://rss.app/embed/v1/wall/CgU6FdKO3n3WYqCk"
          width="100%"
          height="400"
          frameBorder="0"
          scrolling="no"
          title="ROI Feed"
          className="rounded-md overflow-hidden"
        ></iframe>
      </CardContent>
    </Card>
  );
}
