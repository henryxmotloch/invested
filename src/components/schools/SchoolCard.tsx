
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

  // Expanded array of school logos with all uploaded images
  const schoolImages = [
    "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png", // UBC
    "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png", // SFU
    "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png", // BCIT
    "/lovable-uploads/university-of-toronto.png", // UofT
    "/lovable-uploads/university-of-waterloo.png", // UWaterloo
    "/lovable-uploads/mcgill-university.png", // McGill
    "/lovable-uploads/concordia-university.png", // Concordia
    "/lovable-uploads/university-of-calgary.png", // UCalgary
    "/lovable-uploads/university-of-manitoba.png", // UManitoba
    "/lovable-uploads/university-of-saskatchewan.png", // USask
    "/lovable-uploads/university-of-alberta.png", // UAlberta
    "/lovable-uploads/university-of-western-ontario.png", // Western
    "/lovable-uploads/queens-university.png", // Queen's
    "/lovable-uploads/york-university.png", // York
    "/lovable-uploads/ryerson-university.png", // Ryerson/TMU
    "/lovable-uploads/mount-royal-university.png", // Mount Royal
    "/lovable-uploads/university-of-victoria.png", // UVic
    "/lovable-uploads/university-of-ottawa.png", // UOttawa
    "/lovable-uploads/dalhousie-university.png", // Dalhousie
    "/lovable-uploads/macewan-university.png", // MacEwan
    "/lovable-uploads/grant-macewan-university.png", // Grant MacEwan
    "/lovable-uploads/university-of-regina.png", // URegina
    "/lovable-uploads/university-of-windsor.png", // UWindsor
    "/lovable-uploads/carleton-university.png", // Carleton
    "/lovable-uploads/memorial-university.png", // MUN
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
    } else if (schoolNameLower.includes("toronto") && !schoolNameLower.includes("york")) {
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
    } else if (schoolNameLower.includes("saskatchewan") && !schoolNameLower.includes("regina")) {
      return schoolImages[9];
    } else if (schoolNameLower.includes("alberta") && !schoolNameLower.includes("macewan")) {
      return schoolImages[10];
    } else if (schoolNameLower.includes("western")) {
      return schoolImages[11];
    } else if (schoolNameLower.includes("queen")) {
      return schoolImages[12];
    } else if (schoolNameLower.includes("york")) {
      return schoolImages[13];
    } else if (schoolNameLower.includes("ryerson") || schoolNameLower.includes("metropolitan")) {
      return schoolImages[14];
    } else if (schoolNameLower.includes("mount royal")) {
      return schoolImages[15];
    } else if (schoolNameLower.includes("victoria")) {
      return schoolImages[16];
    } else if (schoolNameLower.includes("ottawa")) {
      return schoolImages[17];
    } else if (schoolNameLower.includes("dalhousie")) {
      return schoolImages[18];
    } else if (schoolNameLower.includes("macewan") || schoolNameLower.includes("mac ewan")) {
      return schoolImages[19];
    } else if (schoolNameLower.includes("grant macewan")) {
      return schoolImages[20];
    } else if (schoolNameLower.includes("regina")) {
      return schoolImages[21];
    } else if (schoolNameLower.includes("windsor")) {
      return schoolImages[22];
    } else if (schoolNameLower.includes("carleton")) {
      return schoolImages[23];
    } else if (schoolNameLower.includes("memorial")) {
      return schoolImages[24];
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
