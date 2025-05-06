
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get filters from request body
    const { fieldOfStudy, location, budget, programType } = await req.json();
    
    console.log("Search parameters:", { fieldOfStudy, location, budget, programType });
    
    // Define sample schools with more variety
    const schools = [
      {
        name: "University of British Columbia",
        logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.ubc.ca",
        province: "bc",
        admissionGPA: 3.7,
        admissionRate: 0.52,
        tuitionDomestic: 5500,
        tuitionInternational: 35000,
        placementRate: 0.92,
        averageIncome: 82000,
        programDuration: "4 years",
      },
      {
        name: "BCIT",
        logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
        program: "Software Development",
        programType: "diploma",
        website: "https://www.bcit.ca",
        province: "bc",
        admissionGPA: 3.2,
        admissionRate: 0.65,
        tuitionDomestic: 3200,
        tuitionInternational: 18000,
        placementRate: 0.88,
        averageIncome: 68000,
        programDuration: "2 years",
      },
      {
        name: "Simon Fraser University",
        logo: "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
        program: "Data Science",
        programType: "degree",
        website: "https://www.sfu.ca",
        province: "bc",
        admissionGPA: 3.5,
        admissionRate: 0.58,
        tuitionDomestic: 5000,
        tuitionInternational: 30000,
        placementRate: 0.90,
        averageIncome: 78000,
        programDuration: "4 years",
      },
      {
        name: "University of Toronto",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.utoronto.ca",
        province: "on",
        admissionGPA: 3.8,
        admissionRate: 0.45,
        tuitionDomestic: 6800,
        tuitionInternational: 45000,
        placementRate: 0.94,
        averageIncome: 85000,
        programDuration: "4 years",
      },
      {
        name: "Algonquin College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Algonquin_College.svg/1200px-Algonquin_College.svg.png",
        program: "Web Development",
        programType: "certificate",
        website: "https://www.algonquincollege.com",
        province: "on",
        admissionGPA: 3.0,
        admissionRate: 0.75,
        tuitionDomestic: 1800,
        tuitionInternational: 14000,
        placementRate: 0.82,
        averageIncome: 58000,
        programDuration: "1 year",
      },
      {
        name: "McGill University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
        program: "Engineering",
        programType: "degree",
        website: "https://www.mcgill.ca",
        province: "qc",
        admissionGPA: 3.6,
        admissionRate: 0.48,
        tuitionDomestic: 4500,
        tuitionInternational: 38000,
        placementRate: 0.91,
        averageIncome: 82000,
        programDuration: "4 years",
      },
      {
        name: "University of Alberta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Alberta_seal.svg/1200px-University_of_Alberta_seal.svg.png",
        program: "Education",
        programType: "degree",
        website: "https://www.ualberta.ca",
        province: "ab",
        admissionGPA: 3.4,
        admissionRate: 0.62,
        tuitionDomestic: 5200,
        tuitionInternational: 29000,
        placementRate: 0.85,
        averageIncome: 65000,
        programDuration: "4 years",
      },
      {
        name: "Nova Scotia Community College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/NSCC_Logo.svg/1200px-NSCC_Logo.svg.png",
        program: "Digital Media",
        programType: "diploma",
        website: "https://www.nscc.ca",
        province: "mt",
        admissionGPA: 3.1,
        admissionRate: 0.78,
        tuitionDomestic: 4100,
        tuitionInternational: 16000,
        placementRate: 0.84,
        averageIncome: 54000,
        programDuration: "2 years",
      },
      {
        name: "University of Saskatchewan",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Saskatchewan_shield.svg/1200px-University_of_Saskatchewan_shield.svg.png",
        program: "Agriculture",
        programType: "degree",
        website: "https://www.usask.ca",
        province: "sk",
        admissionGPA: 3.3,
        admissionRate: 0.65,
        tuitionDomestic: 4800,
        tuitionInternational: 25000,
        placementRate: 0.88,
        averageIncome: 68000,
        programDuration: "4 years",
      },
      {
        name: "Red River College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Red_River_College_Polytechnic_Logo.svg/1200px-Red_River_College_Polytechnic_Logo.svg.png",
        program: "IT Management",
        programType: "diploma",
        website: "https://www.rrc.ca",
        province: "mb",
        admissionGPA: 3.0,
        admissionRate: 0.72,
        tuitionDomestic: 3800,
        tuitionInternational: 15000,
        placementRate: 0.86,
        averageIncome: 62000,
        programDuration: "2 years",
      },
      {
        name: "Centennial College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Centennial_College_logo.svg/1200px-Centennial_College_logo.svg.png",
        program: "Culinary Management",
        programType: "certificate",
        website: "https://www.centennialcollege.ca",
        province: "on",
        admissionGPA: 2.8,
        admissionRate: 0.80,
        tuitionDomestic: 1900,
        tuitionInternational: 13000,
        placementRate: 0.80,
        averageIncome: 52000,
        programDuration: "1 year",
      },
      {
        name: "Remote Learning Institute",
        logo: "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
        program: "Web Development",
        programType: "certificate",
        website: "https://www.remotelearning.edu",
        province: "remote",
        admissionGPA: 3.0,
        admissionRate: 0.90,
        tuitionDomestic: 1500,
        tuitionInternational: 1500,
        placementRate: 0.84,
        averageIncome: 59000,
        programDuration: "6 months",
      }
    ];

    // Helper function to get related programs based on field
    const getRelatedPrograms = (field: string): string[] => {
      switch (field) {
        case "business":
          return ["Business", "Commerce", "Finance", "Marketing", "Management", "Business Administration"];
        case "computer-science":
          return ["Computer Science", "Software", "IT", "Computing", "Web Development", "Data Science", "Software Development"];
        case "engineering":
          return ["Engineering", "Civil", "Mechanical", "Electrical", "Chemical"];
        case "medicine":
          return ["Medicine", "Health", "Nursing", "Pharmacy", "Medical"];
        case "arts":
          return ["Arts", "Humanities", "Design", "Fine Arts", "Music", "Digital Media"];
        case "education":
          return ["Education", "Teaching", "Pedagogy"];
        case "law":
          return ["Law", "Legal Studies", "Justice"];
        case "agriculture":
          return ["Agriculture", "Farming", "Agribusiness"];
        case "culinary":
          return ["Culinary", "Food", "Cooking", "Culinary Management"];
        default:
          return [];
      }
    };

    // Helper function to map budget codes to ranges
    const getBudgetRange = (code: string): [number, number] => {
      switch (code) {
        case "under-2k":
          return [0, 2000];
        case "2-5k":
          return [2000, 5000];
        case "5-8k":
          return [5000, 8000];
        case "8k-plus":
          return [8000, 100000];
        default:
          return [0, 100000];
      }
    };

    // Apply filters
    let filteredSchools = [...schools];

    // Filter by location if provided
    if (location && location !== "any") {
      filteredSchools = filteredSchools.filter(school => 
        school.province === location
      );
    }

    // Filter by program/field if specified
    if (fieldOfStudy && fieldOfStudy !== "any") {
      const relatedPrograms = getRelatedPrograms(fieldOfStudy);
      filteredSchools = filteredSchools.filter(school => 
        relatedPrograms.length === 0 || relatedPrograms.some(program => 
          school.program.toLowerCase().includes(program.toLowerCase())
        )
      );
    }
    
    // Filter by budget if specified
    if (budget && budget !== "any") {
      const [minBudget, maxBudget] = getBudgetRange(budget);
      filteredSchools = filteredSchools.filter(school =>
        school.tuitionDomestic >= minBudget && school.tuitionDomestic <= maxBudget
      );
    }

    // Filter by program type if specified
    if (programType && programType !== "any") {
      filteredSchools = filteredSchools.filter(school =>
        school.programType === programType
      );
    }

    console.log(`Found ${filteredSchools.length} schools matching criteria`);
    
    return new Response(
      JSON.stringify({ schools: filteredSchools }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error("Error in search-schools function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
