
import { Card } from "@/components/ui/card";
import { SchoolInfo } from "@/types/school";

interface SchoolCardProps {
  school: SchoolInfo;
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10">
      <div className="p-6 space-y-6">
        <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4">
          <img 
            src={school.logo} 
            alt={`${school.name} Logo`}
            className="object-contain w-full h-full"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
        <h3 className="text-xl font-bold">{school.name}</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Program:</span> {school.program}</p>
          <p>
            <span className="font-semibold">Website:</span>{' '}
            <a href={school.website} target="_blank" rel="noopener noreferrer" 
              className="text-primary hover:underline">
              {school.website}
            </a>
          </p>
          <p><span className="font-semibold">Admission GPA:</span> {school.admissionGPA}</p>
          <p><span className="font-semibold">Admission Rate:</span> {school.admissionRate}%</p>
          <p><span className="font-semibold">Tuition (Domestic):</span> ${school.tuitionDomestic.toLocaleString()}</p>
          <p><span className="font-semibold">Tuition (International):</span> ${school.tuitionInternational.toLocaleString()}</p>
          <p><span className="font-semibold">Job Placement Rate:</span> {school.placementRate}%</p>
          <p><span className="font-semibold">Average Income:</span> ${school.averageIncome.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};

export default SchoolCard;
