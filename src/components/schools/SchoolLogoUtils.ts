
// This file provides a mapping of school names to their logo paths
// For local development with files on your PC, use relative paths or absolute paths as needed

// Map of school names (lowercase) to their logo file paths
// Replace these paths with the actual paths to your JPEG files on your local PC
export const schoolLogoMap: Record<string, string> = {
  // Canadian Universities
  "mcgill": "/logos/mcgill_logo.jpg",
  "mcgill university": "/logos/mcgill_logo.jpg",
  "ubc": "/logos/ubc_logo.jpg",
  "university of british columbia": "/logos/ubc_logo.jpg",
  "sfu": "/logos/sfu_logo.jpg",
  "simon fraser": "/logos/sfu_logo.jpg",
  "simon fraser university": "/logos/sfu_logo.jpg",
  "bcit": "/logos/bcit_logo.jpg",
  "british columbia institute of technology": "/logos/bcit_logo.jpg",
  "university of toronto": "/logos/uoft_logo.jpg",
  "toronto": "/logos/uoft_logo.jpg",
  "university of waterloo": "/logos/waterloo_logo.jpg",
  "waterloo": "/logos/waterloo_logo.jpg",
  "concordia": "/logos/concordia_logo.jpg",
  "concordia university": "/logos/concordia_logo.jpg",
  "university of calgary": "/logos/calgary_logo.jpg",
  "calgary": "/logos/calgary_logo.jpg",
  "university of manitoba": "/logos/manitoba_logo.jpg",
  "manitoba": "/logos/manitoba_logo.jpg",
  "university of saskatchewan": "/logos/saskatchewan_logo.jpg",
  "saskatchewan": "/logos/saskatchewan_logo.jpg",
  "university of alberta": "/logos/alberta_logo.jpg",
  "alberta": "/logos/alberta_logo.jpg",
  "university of western ontario": "/logos/western_logo.jpg",
  "western": "/logos/western_logo.jpg",
  "western university": "/logos/western_logo.jpg",
  "queen's": "/logos/queens_logo.jpg",
  "queen's university": "/logos/queens_logo.jpg",
  "queens university": "/logos/queens_logo.jpg",
  "york": "/logos/york_logo.jpg",
  "york university": "/logos/york_logo.jpg",
  "toronto metropolitan": "/logos/tmu_logo.jpg",
  "toronto metropolitan university": "/logos/tmu_logo.jpg",
  "ryerson": "/logos/ryerson_logo.jpg",
  "ryerson university": "/logos/ryerson_logo.jpg",
  "mount royal": "/logos/mountroyal_logo.jpg",
  "mount royal university": "/logos/mountroyal_logo.jpg",
  "university of victoria": "/logos/victoria_logo.jpg",
  "victoria": "/logos/victoria_logo.jpg",
  "university of ottawa": "/logos/ottawa_logo.jpg",
  "ottawa": "/logos/ottawa_logo.jpg",
  "dalhousie": "/logos/dalhousie_logo.jpg",
  "dalhousie university": "/logos/dalhousie_logo.jpg",
  "macewan": "/logos/macewan_logo.jpg",
  "macewan university": "/logos/macewan_logo.jpg",
  "grant macewan": "/logos/macewan_logo.jpg",
  "grant macewan university": "/logos/macewan_logo.jpg",
  "university of regina": "/logos/regina_logo.jpg",
  "regina": "/logos/regina_logo.jpg",
  "university of windsor": "/logos/windsor_logo.jpg",
  "windsor": "/logos/windsor_logo.jpg",
  "carleton": "/logos/carleton_logo.jpg",
  "carleton university": "/logos/carleton_logo.jpg",
  "memorial": "/logos/memorial_logo.jpg",
  "memorial university": "/logos/memorial_logo.jpg",
  "university of new brunswick": "/logos/unb_logo.jpg",
  "new brunswick": "/logos/unb_logo.jpg",
  
  // Canadian Colleges
  "seneca": "/logos/seneca_logo.jpg",
  "seneca college": "/logos/seneca_logo.jpg",
  "red river": "/logos/redriver_logo.jpg",
  "red river college": "/logos/redriver_logo.jpg",
  "vanier": "/logos/vanier_logo.jpg",
  "vanier college": "/logos/vanier_logo.jpg",
  "saskatchewan polytechnic": "/logos/saskpoly_logo.jpg",
  "sait": "/logos/sait_logo.jpg",
  "sait polytechnic": "/logos/sait_logo.jpg",
};

// A list of fallback logos in case a school name isn't found in the mapping
export const logoList = [
  "/logos/fallback_logo_1.jpg",
  "/logos/fallback_logo_2.jpg",
  "/logos/fallback_logo_3.jpg",
  "/logos/fallback_logo_4.jpg",
  "/logos/fallback_logo_5.jpg",
];

// Default logo as global fallback
export const defaultLogo = "/logos/default_logo.jpg";
