
// Helper functions for formatting and displaying values

// Map location codes to province names
export const getProvinceName = (code: string): string => {
  const provinceMap: { [key: string]: string } = {
    bc: "British Columbia",
    ab: "Alberta",
    sk: "Saskatchewan",
    mb: "Manitoba",
    on: "Ontario",
    qc: "Quebec",
    mt: "Maritimes",
    remote: "Remote Only",
    any: "Any Location"
  };
  return provinceMap[code] || code;
};

// Get program type display name
export const getProgramTypeDisplay = (code: string): string => {
  switch (code) {
    case "certificate":
      return "Certificate";
    case "diploma":
      return "Diploma";
    case "degree":
      return "Degree";
    case "any":
      return "Any Type";
    default:
      return code;
  }
};

// Format budget codes to display text
export const formatBudget = (budget: string): string => {
  switch (budget) {
    case "under-2k":
      return "Under $2,000";
    case "2-5k":
      return "$2,000 - $5,000";
    case "5-8k":
      return "$5,000 - $8,000";
    case "8k-plus":
      return "Over $8,000";
    case "any":
      return "Any Budget";
    default:
      return budget;
  }
};

// Get program name from field
export const getProgramNameFromField = (field: string): string => {
  switch (field) {
    case "business":
      return "Business Administration";
    case "computer-science":
      return "Computer Science";
    case "engineering":
      return "Engineering";
    case "medicine":
      return "Health Sciences";
    case "arts":
      return "Arts & Humanities";
    case "education":
      return "Education";
    case "law":
      return "Law";
    case "agriculture":
      return "Agriculture";
    case "culinary":
      return "Culinary Arts";
    case "any":
      return "Any Field";
    default:
      return field;
  }
};
