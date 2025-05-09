
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SchoolInfo } from "@/types/school";

interface UseSchoolSearchProps {
  userField: string;
  userLocation: string;
  userBudget: string;
  userProgramType: string;
}

interface UseSchoolSearchResult {
  schools: SchoolInfo[];
  loading: boolean;
  searchError: string | null;
  searchSource: string | null;
  searchMessage: string | null;
  searchSchools: () => Promise<void>;
}

export const useSchoolSearch = ({
  userField,
  userLocation,
  userBudget,
  userProgramType
}: UseSchoolSearchProps): UseSchoolSearchResult => {
  const [schools, setSchools] = useState<SchoolInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchSource, setSearchSource] = useState<string | null>(null);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  // Function to search for schools
  const searchSchools = async () => {
    setLoading(true);
    setSearchError(null);
    setSearchSource(null);
    setSearchMessage(null);
    
    try {
      const response = await fetch("https://ypiokkuwqqmytxthcunp.supabase.co/functions/v1/search-schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaW9ra3V3cXFteXR4dGhjdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDkzNDEsImV4cCI6MjA1NjA4NTM0MX0.zZEou6YV13cRe0mqo44MtRM6wVVy6CNLQJmEHrLCe00`
        },
        body: JSON.stringify({
          fieldOfStudy: userField,
          location: userLocation,
          budget: userBudget,
          programType: userProgramType
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to search schools");
      }
      
      console.log("Search results:", data);
      setSearchSource(data.source);
      setSearchMessage(data.message);
      
      // Process the returned schools to map database fields to SchoolInfo
      const processedSchools = data.schools?.map((school: any) => {
        return {
          ...school,
          // Map any new database fields to our SchoolInfo interface
          imageURL: school.imageURL || school.logo,
          worldRanking: school.worldRanking,
          graduateEmployabilityScore: school.graduateEmployabilityScore,
          entranceDifficulty: school.entranceDifficulty,
          institutionType: school.institutionType
        };
      }) || [];
      
      setSchools(processedSchools);
    } catch (error) {
      console.error("Error searching schools:", error);
      setSearchError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error("There was an error searching for schools");
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  // Search for schools when component mounts or preferences change
  useEffect(() => {
    searchSchools();
  }, [userField, userLocation, userBudget, userProgramType]);

  return {
    schools,
    loading,
    searchError,
    searchSource,
    searchMessage,
    searchSchools
  };
};
