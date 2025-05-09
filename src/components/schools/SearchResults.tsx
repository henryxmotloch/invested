
import { SchoolInfo } from "@/types/school";
import SchoolsList from "./SchoolsList";
import CompassPromotion from "./CompassPromotion";

interface SearchResultsProps {
  schools: SchoolInfo[];
}

const SearchResults = ({ schools }: SearchResultsProps) => {
  return (
    <>
      <div className="mb-4 text-left">
        <p className="text-lg">Found {schools.length} schools matching your criteria</p>
      </div>
      <SchoolsList schools={schools} />
      <CompassPromotion />
    </>
  );
};

export default SearchResults;
