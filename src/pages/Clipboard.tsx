
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SchoolInfo {
  id: string;
  name: string;
  logo: string;
  program: string;
  website: string;
  admissionGPA: number;
  admissionRate: number;
  tuitionDomestic: number;
  tuitionInternational: number;
  placementRate: number;
  averageIncome: number;
}

// Default schools data as fallback
const DEFAULT_SCHOOLS: SchoolInfo[] = [
  {
    id: "1",
    name: "University of British Columbia",
    logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
    program: "Engineering Degree",
    website: "https://engineering.ubc.ca/",
    admissionGPA: 3.83,
    admissionRate: 43,
    tuitionDomestic: 7846,
    tuitionInternational: 60622,
    placementRate: 95,
    averageIncome: 80000
  },
  {
    id: "2",
    name: "British Columbia Institute of Technology (BCIT)",
    logo: "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
    program: "Information Technology Management",
    website: "https://www.bcit.ca/",
    admissionGPA: 3.25,
    admissionRate: 50,
    tuitionDomestic: 5500,
    tuitionInternational: 18500,
    placementRate: 92,
    averageIncome: 70000
  },
  {
    id: "3",
    name: "Simon Fraser University (SFU)",
    logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
    program: "Business Administration",
    website: "https://beedie.sfu.ca/",
    admissionGPA: 3.65,
    admissionRate: 40,
    tuitionDomestic: 7200,
    tuitionInternational: 33000,
    placementRate: 90,
    averageIncome: 75000
  }
];

const Clipboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [searchQuery, setSearchQuery] = useState("");
  const [schools, setSchools] = useState<SchoolInfo[]>(DEFAULT_SCHOOLS);
  const [isLoading, setIsLoading] = useState(false);

  // No redirect - allow direct access
  // Use default values if state is missing
  const userName = state?.name || "Visitor";
  const userEmail = state?.email || "visitor@example.com";
  const userLocation = state?.location || "N/A";
  const userBudget = state?.budget || "N/A";
  const userDuration = state?.duration || "N/A";
  const userField = state?.field || "N/A";

  useEffect(() => {
    // Initial load with user preferences if available
    if (state?.field) {
      searchSchools(state.field);
    }
  }, [state]);

  const searchSchools = async (query: string) => {
    if (!query.trim()) {
      setSchools(DEFAULT_SCHOOLS);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to fetch schools from Supabase School table
      const { data, error } = await supabase
        .from('School')
        .select('*')
        .ilike('SchoolName', `%${query}%`)
        .limit(10);
      
      if (error) throw error;
      
      // If we have results from the database, format them to match our SchoolInfo interface
      if (data && data.length > 0) {
        const formattedSchools = data.map(school => ({
          id: school.SchoolID,
          name: school.SchoolName || "Unknown School",
          logo: "/placeholder.svg", // Default placeholder
          program: userField || "Various Programs",
          website: school.WebsiteURL || "#",
          admissionGPA: 3.0, // Default values if not available
          admissionRate: school.EntranceDifficulty === "High" ? 30 : school.EntranceDifficulty === "Medium" ? 50 : 70,
          tuitionDomestic: school.UndergraduateTuition || 5000,
          tuitionInternational: school.PostgraduateTuition || 15000,
          placementRate: school.GraduateEmployabilityScore ? school.GraduateEmployabilityScore * 100 : 85,
          averageIncome: 65000 // Default value
        }));
        
        setSchools(formattedSchools);
      } else {
        // If no results, filter our default schools based on the search query
        const filteredSchools = DEFAULT_SCHOOLS.filter(
          school => school.name.toLowerCase().includes(query.toLowerCase())
        );
        
        setSchools(filteredSchools.length > 0 ? filteredSchools : DEFAULT_SCHOOLS);
      }
    } catch (error) {
      console.error("Error searching for schools:", error);
      toast.error("Failed to search schools. Using default options.");
      setSchools(DEFAULT_SCHOOLS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchSchools(searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for schools, programs, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/20 border-white/20 text-white placeholder:text-white/60 pr-12"
            />
            <Button 
              type="submit"
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full"
              disabled={isLoading}
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="mt-4 text-sm text-white/70">
            <p>Showing results based on: Field of Study: {userField}, Location: {userLocation}, Budget: {userBudget}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : schools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {schools.map((school, index) => (
              <Card key={index} className="overflow-hidden backdrop-blur-lg bg-white/10">
                <div className="p-6 space-y-6">
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-white p-4">
                    <img 
                      src={school.logo} 
                      alt={`${school.name} Logo`}
                      className="object-contain w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold">{school.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Program:</span> {school.program}</p>
                    <p>
                      <span className="font-semibold">Website:</span>{' '}
                      <a href={school.website} target="_blank" rel="noopener noreferrer" 
                        className="text-primary hover:underline">
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
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center my-12">
            <p className="text-xl">No schools found matching your criteria.</p>
          </div>
        )}

        <Card className="max-w-4xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h2 className="text-2xl font-bold mb-4">Get Your Personalized Compass</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Take your planning to the next level with Compass, a detailed information dashboard 
            tailored to your chosen program and institution. Discover insights about admissions, 
            tuition, career outcomes, and more—all in one place!
          </p>
          <Button 
            className="w-full md:w-auto"
            onClick={() => navigate("/cart")}
          >
            View Cart & Purchase Compass
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Clipboard;
