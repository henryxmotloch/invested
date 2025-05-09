
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SchoolDetailsProps {
  name: string;
  program: string;
  programType: string;
  province: string;
  programDuration?: string;
  website: string;
  admissionGPA: number;
  admissionRate: number;
  tuitionDomestic: number;
  tuitionInternational: number;
  placementRate: number;
  averageIncome: number;
}

const SchoolDetails = ({
  name,
  program,
  programType,
  province,
  programDuration,
  website,
  admissionGPA,
  admissionRate,
  tuitionDomestic,
  tuitionInternational,
  placementRate,
  averageIncome,
}: SchoolDetailsProps) => {
  const navigate = useNavigate();

  // Function to capitalize first letter of each word
  const capitalize = (text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <h3 className="text-xl font-bold line-clamp-2 h-14">{name}</h3>
      
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Program:</span> {program}</p>
        <p><span className="font-semibold">Program Type:</span> {capitalize(programType)}</p>
        <p><span className="font-semibold">Province:</span> {province.toUpperCase()}</p>
        {programDuration && (
          <p><span className="font-semibold">Duration:</span> {programDuration}</p>
        )}
        <p>
          <span className="font-semibold">Website:</span>{' '}
          <a href={website} target="_blank" rel="noopener noreferrer" 
            className="text-primary hover:underline truncate inline-block max-w-[200px]">
            {website}
          </a>
        </p>
        <p><span className="font-semibold">Admission GPA:</span> {admissionGPA}</p>
        <p><span className="font-semibold">Admission Rate:</span> {admissionRate}%</p>
        <p><span className="font-semibold">Tuition (Domestic):</span> ${tuitionDomestic.toLocaleString()}</p>
        <p><span className="font-semibold">Tuition (International):</span> ${tuitionInternational.toLocaleString()}</p>
        <p><span className="font-semibold">Job Placement Rate:</span> {placementRate}%</p>
        <p><span className="font-semibold">Average Income:</span> ${averageIncome.toLocaleString()}</p>
      </div>
      
      <Button 
        onClick={() => navigate("/cart")}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Get Full Report
      </Button>
    </>
  );
};

export default SchoolDetails;
