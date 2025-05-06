
export interface SchoolInfo {
  name: string;
  logo: string;
  program: string;
  programType: string; // New field: diploma, certificate, degree
  website: string;
  province: string;
  admissionGPA: number;
  admissionRate: number;
  tuitionDomestic: number;
  tuitionInternational: number;
  placementRate: number;
  averageIncome: number;
  programDuration?: string; // in years or months
}
