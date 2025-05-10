// This file provides a mapping of school names to their logo paths
// For local development with files on your PC, use relative paths or absolute paths as needed

// Map of school names (lowercase) to their logo file paths
// Replace the paths with the actual paths to your JPEG files on your local PC
export const schoolLogoMap: Record<string, string> = {
  // Example format - replace these paths with your actual local file paths
  // "school name lowercase": "/path/to/your/local/file.jpg",
  
  // Canadian Universities - update these paths to point to your local JPEG files
  "mcgill": "/path/to/mcgill_logo.jpg",
  "mcgill university": "/path/to/mcgill_logo.jpg",
  "ubc": "/path/to/ubc_logo.jpg",
  "university of british columbia": "/path/to/ubc_logo.jpg",
  "sfu": "/path/to/sfu_logo.jpg",
  "simon fraser": "/path/to/sfu_logo.jpg",
  "simon fraser university": "/path/to/sfu_logo.jpg",
  "bcit": "/path/to/bcit_logo.jpg",
  "british columbia institute of technology": "/path/to/bcit_logo.jpg",
  "university of toronto": "/path/to/uoft_logo.jpg",
  "toronto": "/path/to/uoft_logo.jpg",
  "university of waterloo": "/path/to/waterloo_logo.jpg",
  "waterloo": "/path/to/waterloo_logo.jpg",
  "concordia": "/path/to/concordia_logo.jpg",
  "concordia university": "/path/to/concordia_logo.jpg",
  "university of calgary": "/path/to/calgary_logo.jpg",
  "calgary": "/path/to/calgary_logo.jpg",
  "university of manitoba": "/path/to/manitoba_logo.jpg",
  "manitoba": "/path/to/manitoba_logo.jpg",
  "university of saskatchewan": "/path/to/saskatchewan_logo.jpg",
  "saskatchewan": "/path/to/saskatchewan_logo.jpg",
  "university of alberta": "/path/to/alberta_logo.jpg",
  "alberta": "/path/to/alberta_logo.jpg",
  "university of western ontario": "/path/to/western_logo.jpg",
  "western": "/path/to/western_logo.jpg",
  "western university": "/path/to/western_logo.jpg",
  "queen's": "/path/to/queens_logo.jpg",
  "queen's university": "/path/to/queens_logo.jpg",
  "queens university": "/path/to/queens_logo.jpg",
  "york": "/path/to/york_logo.jpg",
  "york university": "/path/to/york_logo.jpg",
  "toronto metropolitan": "/path/to/tmu_logo.jpg",
  "toronto metropolitan university": "/path/to/tmu_logo.jpg",
  "ryerson": "/path/to/ryerson_logo.jpg",
  "ryerson university": "/path/to/ryerson_logo.jpg",
  "mount royal": "/path/to/mountroyal_logo.jpg",
  "mount royal university": "/path/to/mountroyal_logo.jpg",
  "university of victoria": "/path/to/victoria_logo.jpg",
  "victoria": "/path/to/victoria_logo.jpg",
  "university of ottawa": "/path/to/ottawa_logo.jpg",
  "ottawa": "/path/to/ottawa_logo.jpg",
  "dalhousie": "/path/to/dalhousie_logo.jpg",
  "dalhousie university": "/path/to/dalhousie_logo.jpg",
  "macewan": "/path/to/macewan_logo.jpg",
  "macewan university": "/path/to/macewan_logo.jpg",
  "grant macewan": "/path/to/macewan_logo.jpg",
  "grant macewan university": "/path/to/macewan_logo.jpg",
  "university of regina": "/path/to/regina_logo.jpg",
  "regina": "/path/to/regina_logo.jpg",
  "university of windsor": "/path/to/windsor_logo.jpg",
  "windsor": "/path/to/windsor_logo.jpg",
  "carleton": "/path/to/carleton_logo.jpg",
  "carleton university": "/path/to/carleton_logo.jpg",
  "memorial": "/path/to/memorial_logo.jpg",
  "memorial university": "/path/to/memorial_logo.jpg",
  "university of new brunswick": "/path/to/unb_logo.jpg",
  "new brunswick": "/path/to/unb_logo.jpg",
  
  // Canadian Colleges
  "seneca": "/path/to/seneca_logo.jpg",
  "seneca college": "/path/to/seneca_logo.jpg",
  "red river": "/path/to/redriver_logo.jpg",
  "red river college": "/path/to/redriver_logo.jpg",
  "vanier": "/path/to/vanier_logo.jpg",
  "vanier college": "/path/to/vanier_logo.jpg",
  "saskatchewan polytechnic": "/path/to/saskpoly_logo.jpg",
  "sait": "/path/to/sait_logo.jpg",
  "sait polytechnic": "/path/to/sait_logo.jpg",
};

// A list of fallback logos in case a school name isn't found in the mapping
// Update these paths to your local fallback logo files
export const logoList = [
  "/path/to/fallback_logo_1.jpg",
  "/path/to/fallback_logo_2.jpg",
  "/path/to/fallback_logo_3.jpg",
  "/path/to/fallback_logo_4.jpg",
  "/path/to/fallback_logo_5.jpg",
];

// Default logo as global fallback
export const defaultLogo = "/path/to/default_logo.jpg";
