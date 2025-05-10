
import { useState, useEffect } from "react";
import { schoolLogoMap } from "./SchoolLogoUtils";

interface SchoolLogoProps {
  schoolName: string;
  logo?: string;
  index: number;
}

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

const SchoolLogo = ({ schoolName, logo, index }: SchoolLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const [displayImage, setDisplayImage] = useState<string>("");

  useEffect(() => {
    // Reset error state when the school changes
    setImageError(false);
    const logoToUse = getSchoolLogo(schoolName, logo);
    setDisplayImage(logoToUse);
  }, [schoolName, logo]);

  // Get the appropriate logo for a school
  const getSchoolLogo = (name: string, providedLogo?: string): string => {
    const schoolNameLower = name.toLowerCase();
    
    // 1. Try exact match from our map first
    if (schoolLogoMap[schoolNameLower]) {
      return schoolLogoMap[schoolNameLower];
    }
    
    // 2. Try partial matches for keywords in school name
    for (const [key, logoPath] of Object.entries(schoolLogoMap)) {
      if (schoolNameLower.includes(key)) {
        return logoPath;
      }
    }
    
    // 3. If school provides its own logo that looks valid, use that
    if (providedLogo && 
        providedLogo.length > 10 && 
        !providedLogo.includes("undefined") && 
        !providedLogo.startsWith("https://upload.wikimedia.org")) {
      return providedLogo;
    }
    
    // 4. Use generic logo based on index as fallback
    return genericLogos[index % genericLogos.length];
  };
  
  // Handle image error by using fallback
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      console.log(`Failed to load image for ${schoolName}, using fallback`);
      // If error occurs with main logo, try a generic one based on index
      setDisplayImage(genericLogos[index % genericLogos.length]);
    }
  };

  return (
    <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4 flex items-center justify-center">
      {displayImage && (
        <img 
          src={displayImage} 
          alt={`${schoolName} Logo`}
          className="object-contain w-full h-full max-h-[140px]"
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default SchoolLogo;
