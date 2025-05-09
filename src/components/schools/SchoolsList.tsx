
import { SchoolInfo } from "@/types/school";
import SchoolCard from "./SchoolCard";

interface SchoolsListProps {
  schools: SchoolInfo[];
}

const SchoolsList = ({ schools }: SchoolsListProps) => {
  if (schools.length === 0) {
    return (
      <div className="text-center my-12">
        <p className="text-xl">No schools found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {schools.map((school, index) => (
        <SchoolCard key={index} school={school} />
      ))}
    </div>
  );
};

export default SchoolsList;
