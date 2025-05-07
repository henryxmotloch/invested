
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "@/types/school";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SchoolCardProps {
  school: SchoolInfo;
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Function to capitalize first letter of each word
  const capitalize = (text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get appropriate fallback image based on program type
  const getFallbackImage = (): string => {
    const program = school.program.toLowerCase();
    
    if (program.includes('computer') || program.includes('software') || program.includes('tech')) {
      return "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png";
    } else if (program.includes('business') || program.includes('management') || program.includes('commerce')) {
      return "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png";
    } else if (program.includes('engineering') || program.includes('science')) {
      return "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png";
    }
    
    // Default image based on province
    switch (school.province) {
      case 'bc':
        return "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png";
      case 'on':
        return "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png";
      default:
        return "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png";
    }
  };
  
  // Determine which image to display
  const displayImage = imageError || !school.logo ? getFallbackImage() : school.logo;
  
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10">
      <div className="p-6 space-y-6">
        <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4">
          <img 
            src={displayImage} 
            alt={`${school.name} Logo`}
            className="object-contain w-full h-full"
            onError={() => setImageError(true)}
          />
        </div>
        <h3 className="text-xl font-bold">{school.name}</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-semibold">Program:</span> {school.program}</p>
          <p><span className="font-semibold">Program Type:</span> {capitalize(school.programType)}</p>
          <p><span className="font-semibold">Province:</span> {school.province.toUpperCase()}</p>
          {school.programDuration && (
            <p><span className="font-semibold">Duration:</span> {school.programDuration}</p>
          )}
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
        
        <Button 
          onClick={() => navigate("/cart")}
          className="w-full"
        >
          Get Full Report
        </Button>
      </div>
    </Card>
  );
};

export default SchoolCard;
