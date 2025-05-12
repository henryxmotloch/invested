
import { useState, useEffect } from "react";
import { schoolLogoMap, logoList, defaultLogo } from "./SchoolLogoUtils";
import { toast } from "sonner";

interface SchoolLogoProps {
  schoolName: string;
  logo?: string;
  index: number;
}

const SchoolLogo = ({ schoolName, logo, index }: SchoolLogoProps) => {
  const [displayImage, setDisplayImage] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset error state when the school changes
    setImageError(false);
    setIsLoading(true);
    
    // Get appropriate logo
    const logoToUse = getSchoolLogo(schoolName, logo);
    console.log(`Setting logo for ${schoolName}: ${logoToUse}`);
    setDisplayImage(logoToUse);
  }, [schoolName, logo]);

  // Get the appropriate logo for a school
  const getSchoolLogo = (name: string, providedLogo?: string): string => {
    // Normalize the school name
    const schoolNameLower = name.toLowerCase().trim();
    
    console.log(`Finding logo for: ${name}`);
    
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

    // 4. Try handling Saint/St variations
    if (schoolNameLower.includes("saint") || schoolNameLower.includes("st.") || schoolNameLower.includes("st ")) {
      const normalizedName = schoolNameLower
        .replace("saint", "saint")
        .replace("st.", "saint")
        .replace("st ", "saint ");
      
      for (const [key, logoPath] of Object.entries(schoolLogoMap)) {
        if (key.includes("saint") && normalizedName.includes(key.replace("saint", ""))) {
          console.log(`Found saint/st match for ${name} with key ${key}: ${logoPath}`);
          return logoPath;
        }
      }
    }
    
    // 5. Use a logo from our collection based on index
    const fallbackIndex = Math.abs(schoolNameLower.split("").reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    ) % logoList.length);
    
    const fallbackLogo = logoList[fallbackIndex];
    console.log(`Using fallback logo for ${name}: ${fallbackLogo}`);
    return fallbackLogo;
  };

  // Helper function to check if a path is valid
  const isValidPath = (path: string): boolean => {
    return Boolean(path) && path.length > 0 && !path.includes("undefined") && !path.includes("null");
  };
  
  // Handle image error by using fallback
  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      console.log(`Failed to load image for ${schoolName}, using default fallback`);
      
      // Display toast message for debugging
      toast.error(`Could not load logo for ${schoolName}. Using default.`, {
        duration: 3000,
      });
      
      // If error occurs with logo, use the default fallback logo
      setDisplayImage(defaultLogo);
    }
    
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded image for ${schoolName}`);
    setIsLoading(false);
  };

  return (
    <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse w-12 h-12 rounded-full bg-gray-200"></div>
        </div>
      )}
      
      {displayImage ? (
        <img 
          src={displayImage} 
          alt={`${schoolName} Logo`}
          className={`object-contain w-full h-full max-h-[140px] ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      ) : (
        <div className="text-gray-400">No logo</div>
      )}
    </div>
  );
};

export default SchoolLogo;
