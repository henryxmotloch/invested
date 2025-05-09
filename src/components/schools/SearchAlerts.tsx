
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchAlertsProps {
  searchSource: string | null;
  searchMessage: string | null;
  searchError: string | null;
  onRetry: () => void;
}

const SearchAlerts = ({ searchSource, searchMessage, searchError, onRetry }: SearchAlertsProps) => {
  return (
    <>
      {searchSource && searchSource.includes("default") && (
        <Alert className="mb-6 bg-orange-100 border-orange-300">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          <AlertDescription className="text-orange-800">
            {searchMessage || "Using default schools. Try adjusting your search criteria."}
          </AlertDescription>
        </Alert>
      )}

      {searchMessage && searchSource?.includes("no filter") && (
        <Alert className="mb-6 bg-blue-100 border-blue-300">
          <AlertCircle className="h-5 w-5 text-blue-500" />
          <AlertDescription className="text-blue-800">
            {searchMessage}
          </AlertDescription>
        </Alert>
      )}

      {searchError && (
        <div className="p-4 mb-6 bg-destructive/10 text-destructive rounded-md">
          <p>Error: {searchError}</p>
          <Button onClick={onRetry} variant="outline" className="mt-2">
            Try Again
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchAlerts;
