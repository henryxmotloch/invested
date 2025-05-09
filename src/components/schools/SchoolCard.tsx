
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SchoolInfo } from "@/types/school";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface SchoolCardProps {
  school: SchoolInfo;
  index: number;
}

const SchoolCard = ({ school, index }: SchoolCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [displayImage, setDisplayImage] = useState<string>("");
  
  // Function to capitalize first letter of each word
  const capitalize = (text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Complete mapping of school names to logo paths
  const schoolLogoMap: Record<string, string> = {
    // Canadian Universities
    "mcgill university": "/lovable-uploads/67bd3cb4-1e01-47f8-90e0-63553957b020.png",
    "university of british columbia": "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
    "simon fraser university": "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
    "british columbia institute of technology": "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
    "university of toronto": "/lovable-uploads/university-of-toronto.png",
    "university of waterloo": "/lovable-uploads/university-of-waterloo.png",
    "concordia university": "/lovable-uploads/concordia-university.png",
    "university of calgary": "/lovable-uploads/university-of-calgary.png",
    "university of manitoba": "/lovable-uploads/university-of-manitoba.png",
    "university of saskatchewan": "/lovable-uploads/university-of-saskatchewan.png",
    "university of alberta": "/lovable-uploads/university-of-alberta.png",
    "university of western ontario": "/lovable-uploads/university-of-western-ontario.png",
    "queen's university": "/lovable-uploads/queens-university.png",
    "york university": "/lovable-uploads/york-university.png",
    "toronto metropolitan university": "/lovable-uploads/ryerson-university.png",
    "ryerson university": "/lovable-uploads/ryerson-university.png",
    "mount royal university": "/lovable-uploads/mount-royal-university.png",
    "university of victoria": "/lovable-uploads/university-of-victoria.png",
    "university of ottawa": "/lovable-uploads/university-of-ottawa.png",
    "dalhousie university": "/lovable-uploads/f28bb5a2-f5e4-49cd-9618-fbb630dd51cc.png",
    "macewan university": "/lovable-uploads/macewan-university.png",
    "grant macewan university": "/lovable-uploads/grant-macewan-university.png",
    "university of regina": "/lovable-uploads/university-of-regina.png",
    "university of windsor": "/lovable-uploads/university-of-windsor.png",
    "carleton university": "/lovable-uploads/carleton-university.png",
    "memorial university": "/lovable-uploads/memorial-university.png",
    "university of new brunswick": "/lovable-uploads/f28bb5a2-f5e4-49cd-9618-fbb630dd51cc.png",
    // Add more mappings as needed
  };
  
  // Generic university logo as default fallback
  const defaultLogo = "/lovable-uploads/f28bb5a2-f5e4-49cd-9618-fbb630dd51cc.png";
  
  // Generic logos for when no exact match is found
  const genericLogos = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop", 
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
  ];

  // Get the appropriate logo for a school
  const getSchoolLogo = (): string => {
    const schoolNameLower = school.name.toLowerCase();
    
    // 1. Try exact match from our map first
    if (schoolLogoMap[schoolNameLower]) {
      return schoolLogoMap[schoolNameLower];
    }
    
    // 2. Try partial matches
    for (const [key, logoPath] of Object.entries(schoolLogoMap)) {
      if (schoolNameLower.includes(key)) {
        return logoPath;
      }
    }
    
    // 3. If school provides its own logo that's not in our map, use that
    if (school.logo && !school.logo.startsWith("https://upload.wikimedia.org")) {
      return school.logo;
    }
    
    // 4. Use default university logo as fallback
    return defaultLogo;
  };
  
  // Set the image source on component mount
  useEffect(() => {
    const logoToUse = getSchoolLogo();
    setDisplayImage(logoToUse);
  }, [school.name, school.logo]);
  
  // Handle image error by using fallback
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // If error occurs, fall back to a generic logo based on index
      setDisplayImage(genericLogos[index % genericLogos.length]);
    }
  };
  
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/10 hover:shadow-lg transition-all duration-300">
      <div className="p-6 space-y-6">
        <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4 flex items-center justify-center">
          {displayImage && (
            <img 
              src={displayImage} 
              alt={`${school.name} Logo`}
              className="object-contain w-full h-full max-h-[140px]"
              onError={handleImageError}
            />
          )}
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
