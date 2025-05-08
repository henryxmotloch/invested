
export interface SchoolInfo {
  name: string;
  logo: string;
  program: string;
  programType: string; // diploma, certificate, degree
  website: string;
  province: string;
  admissionGPA: number;
  admissionRate: number;
  tuitionDomestic: number;
  tuitionInternational: number;
  placementRate: number;
  averageIncome: number;
  programDuration?: string; // in years or months
  schooId?: string; // Added from database
  imageURL?: string; // Added from database
  worldRanking?: number; // Added from database
  graduateEmployabilityScore?: number; // Added from database
  entranceDifficulty?: string; // Added from database
  institutionType?: string; // Added from database
}
