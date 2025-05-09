
import { Card } from "@/components/ui/card";
import { SchoolInfo } from "@/types/school";
import SchoolLogo from "./SchoolLogo";
import SchoolDetails from "./SchoolDetails";

interface SchoolCardProps {
  school: SchoolInfo;
  index: number;
}

const SchoolCard = ({ school, index }: SchoolCardProps) => {
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10 hover:shadow-lg transition-all duration-300">
      <div className="p-6 space-y-6">
        <SchoolLogo 
          schoolName={school.name} 
          logo={school.logo} 
          index={index} 
        />
        
        <SchoolDetails 
          name={school.name}
          program={school.program}
          programType={school.programType}
          province={school.province}
          programDuration={school.programDuration}
          website={school.website}
          admissionGPA={school.admissionGPA}
          admissionRate={school.admissionRate}
          tuitionDomestic={school.tuitionDomestic}
          tuitionInternational={school.tuitionInternational}
          placementRate={school.placementRate}
          averageIncome={school.averageIncome}
        />
      </div>
    </Card>
  );
};

export default SchoolCard;
