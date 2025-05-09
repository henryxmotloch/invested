
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "@/types/school";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SchoolCardProps {
  school: SchoolInfo;
  index: number;
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

  // Complete array of school logos
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
    "/lovable-uploads/f28bb5a2-f5e4-49cd-9618-fbb630dd51cc.png", // University reference image
  ];

  // Generic university logo fallbacks
  const genericLogos = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop", 
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
  ];

  // More accurate school name matching
  const getFallbackImage = (): string => {
    const schoolNameLower = school.name.toLowerCase();
    
    // Try to find exact matches first
    if (schoolNameLower.includes("british columbia") || schoolNameLower.includes("ubc")) {
      return schoolImages[0];
    } else if (schoolNameLower.includes("simon fraser") || schoolNameLower.includes("sfu")) {
      return schoolImages[1];
    } else if (schoolNameLower === "bcit" || schoolNameLower.includes("british columbia institute of technology")) {
      return schoolImages[2];
    } else if (schoolNameLower.includes("toronto") && !schoolNameLower.includes("york") && !schoolNameLower.includes("ryerson")) {
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
    } else if (schoolNameLower.includes("western") || schoolNameLower.includes("uwo")) {
      return schoolImages[11];
    } else if (schoolNameLower.includes("queen")) {
      return schoolImages[12];
    } else if (schoolNameLower.includes("york")) {
      return schoolImages[13];
    } else if (schoolNameLower.includes("ryerson") || schoolNameLower.includes("metropolitan") || schoolNameLower.includes("tmu")) {
      return schoolImages[14];
    } else if (schoolNameLower.includes("mount royal")) {
      return schoolImages[15];
    } else if (schoolNameLower.includes("victoria") || schoolNameLower.includes("uvic")) {
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
    } else if (schoolNameLower.includes("memorial") || schoolNameLower.includes("mun")) {
      return schoolImages[24];
    } else if (schoolNameLower.includes("new brunswick") || schoolNameLower.includes("unb")) {
      return schoolImages[25]; // New reference image
    }
    
    // If no match found and no logo provided, use generic images based on index
    return genericLogos[index % genericLogos.length];
  };
  
  // Initialize display image
  const [displayImage, setDisplayImage] = useState<string>("");
  
  // Setup image with proper error handling
  useEffect(() => {
    // First try the provided logo
    if (school.logo && !imageError) {
      setDisplayImage(school.logo);
    } else {
      // If no logo or error, use fallback
      const fallbackImg = getFallbackImage();
      setDisplayImage(fallbackImg);
      setImageError(false); // Reset error state after switching to fallback
    }
  }, [school.logo, imageError, school.name]);
  
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10 hover:shadow-lg transition-all duration-300">
      <div className="p-6 space-y-6">
        <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4 flex items-center justify-center">
          <img 
            src={displayImage} 
            alt={`${school.name} Logo`}
            className="object-contain w-full h-full max-h-[140px]"
            onError={() => setImageError(true)}
          />
        </div>
        
        <h3 className="text-xl font-bold line-clamp-2 h-14">{school.name}</h3>
        
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
              className="text-primary hover:underline truncate inline-block max-w-[200px]">
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
          className="w-full bg-primary hover:bg-primary/90"
        >
          Get Full Report
        </Button>
      </div>
    </Card>
  );
};

export default SchoolCard;
