
import { useState, useEffect } from "react";
import { schoolLogoMap, logoList, defaultLogo } from "./SchoolLogoUtils";

interface SchoolLogoProps {
  schoolName: string;
  logo?: string;
  index: number;
}

const SchoolLogo = ({ schoolName, logo, index }: SchoolLogoProps) => {
  const [displayImage, setDisplayImage] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset error state when the school changes
    setImageError(false);
    
    // Get appropriate logo
    const logoToUse = getSchoolLogo(schoolName, logo);
    setDisplayImage(logoToUse);
  }, [schoolName, logo]);

  // Get the appropriate logo for a school
  const getSchoolLogo = (name: string, providedLogo?: string): string => {
    // Normalize the school name
    const schoolNameLower = name.toLowerCase().trim();
    
    // 1. Try using the provided logo in the school data if it's valid
    if (providedLogo && isValidPath(providedLogo)) {
      console.log(`Using provided logo for ${name}: ${providedLogo}`);
      return providedLogo;
    }
    
    // 2. Try exact match from our mapping
    if (schoolLogoMap[schoolNameLower]) {
      console.log(`Found exact match for ${name}: ${schoolLogoMap[schoolNameLower]}`);
      return schoolLogoMap[schoolNameLower];
    }
    
    // 3. Try partial matches for keywords in school name
    for (const [key, logoPath] of Object.entries(schoolLogoMap)) {
      if (schoolNameLower.includes(key)) {
        console.log(`Found partial match for ${name} with key ${key}: ${logoPath}`);
        return logoPath;
      }
    }
    
    // 4. Use a logo from our collection based on index
    const fallbackLogo = logoList[index % logoList.length];
    console.log(`Using fallback logo for ${name}: ${fallbackLogo}`);
    return fallbackLogo;
  };

  // Helper function to check if a path is valid
  const isValidPath = (path: string): boolean => {
    // For local files, you might want to check if the path follows your expected format
    // This is a simple check - customize based on your actual path structure
    return path.length > 0;
  };
  
  // Handle image error by using fallback
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      console.log(`Failed to load image for ${schoolName}, using default fallback`);
      // If error occurs with logo, use the default fallback logo
      setDisplayImage(defaultLogo);
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
