
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "@/types/school";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SchoolCardProps {
  school: SchoolInfo;
  index: number; // Added index prop to help with unique image selection
}

const SchoolCard = ({ school, index }: SchoolCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  // Function to capitalize first letter of each word
  const capitalize = (text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Array of unique school images to use as fallbacks
  const schoolImages = [
    "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png", // UBC
    "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png", // SFU
    "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png", // BCIT
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Concordia_University_logo.svg/1200px-Concordia_University_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/University_of_Calgary_Logo.svg/1200px-University_of_Calgary_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_of_Manitoba_logo.svg/1200px-University_of_Manitoba_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Saskatchewan_shield.svg/1200px-University_of_Saskatchewan_shield.svg.png",
  ];

  // Get appropriate fallback image based on school and index
  const getFallbackImage = (): string => {
    // First try to assign based on school name to maintain consistency
    const schoolNameLower = school.name.toLowerCase();
    
    if (schoolNameLower.includes("british columbia") || schoolNameLower.includes("ubc")) {
      return schoolImages[0];
    } else if (schoolNameLower.includes("simon fraser") || schoolNameLower.includes("sfu")) {
      return schoolImages[1];
    } else if (schoolNameLower.includes("bcit")) {
      return schoolImages[2];
    } else if (schoolNameLower.includes("toronto")) {
      return schoolImages[3];
    } else if (schoolNameLower.includes("waterloo")) {
      return schoolImages[4];
    } else if (schoolNameLower.includes("mcgill")) {
      return schoolImages[5];
    } else if (schoolNameLower.includes("concordia")) {
      return schoolImages[6];
    } else if (schoolNameLower.includes("calgary")) {
      return schoolImages[7];
    } else if (schoolNameLower.includes("manitoba")) {
      return schoolImages[8];
    } else if (schoolNameLower.includes("saskatchewan")) {
      return schoolImages[9];
    }
    
    // If no match found, use the index to select a unique image
    // Use modulo to cycle through available images if there are more schools than images
    return schoolImages[index % schoolImages.length];
  };
  
  // Determine which image to display
  const [displayImage, setDisplayImage] = useState(school.logo || getFallbackImage());
  
  // Update display image if school logo changes or on error
  useEffect(() => {
    if (imageError || !school.logo) {
      setDisplayImage(getFallbackImage());
    } else {
      setDisplayImage(school.logo);
    }
  }, [school.logo, imageError]);
  
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
