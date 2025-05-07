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
    
    // Define expanded school dataset with much more variety
    const schools = [
      // British Columbia Schools
      {
        name: "University of British Columbia",
        logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.ubc.ca",
        province: "bc",
        admissionGPA: 3.7,
        admissionRate: 52,
        tuitionDomestic: 5500,
        tuitionInternational: 35000,
        placementRate: 92,
        averageIncome: 82000,
        programDuration: "4 years",
      },
      {
        name: "University of British Columbia",
        logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.ubc.ca",
        province: "bc",
        admissionGPA: 3.5,
        admissionRate: 55,
        tuitionDomestic: 5300,
        tuitionInternational: 32000,
        placementRate: 90,
        averageIncome: 79000,
        programDuration: "4 years",
      },
      {
        name: "University of British Columbia",
        logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
        program: "Education",
        programType: "degree",
        website: "https://www.ubc.ca",
        province: "bc",
        admissionGPA: 3.4,
        admissionRate: 60,
        tuitionDomestic: 5100,
        tuitionInternational: 30000,
        placementRate: 88,
        averageIncome: 65000,
        programDuration: "4 years",
      },
      {
        name: "University of British Columbia",
        logo: "/lovable-uploads/c33828a1-9c0c-4b97-bfdf-ebec721b736e.png",
        program: "Engineering",
        programType: "degree",
        website: "https://www.ubc.ca",
        province: "bc",
        admissionGPA: 3.8,
        admissionRate: 45,
        tuitionDomestic: 5800,
        tuitionInternational: 38000,
        placementRate: 95,
        averageIncome: 90000,
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
        admissionRate: 65,
        tuitionDomestic: 3200,
        tuitionInternational: 18000,
        placementRate: 88,
        averageIncome: 68000,
        programDuration: "2 years",
      },
      {
        name: "BCIT",
        logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
        program: "Business Management",
        programType: "certificate",
        website: "https://www.bcit.ca",
        province: "bc",
        admissionGPA: 2.8,
        admissionRate: 75,
        tuitionDomestic: 1800,
        tuitionInternational: 12000,
        placementRate: 85,
        averageIncome: 58000,
        programDuration: "1 year",
      },
      {
        name: "BCIT",
        logo: "/lovable-uploads/23a8b5bf-5d39-4994-b080-b15ae4f8a454.png",
        program: "Culinary Arts",
        programType: "diploma",
        website: "https://www.bcit.ca",
        province: "bc",
        admissionGPA: 3.0,
        admissionRate: 70,
        tuitionDomestic: 3500,
        tuitionInternational: 16000,
        placementRate: 82,
        averageIncome: 55000,
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
        admissionRate: 58,
        tuitionDomestic: 5000,
        tuitionInternational: 30000,
        placementRate: 90,
        averageIncome: 78000,
        programDuration: "4 years",
      },
      {
        name: "Simon Fraser University",
        logo: "/lovable-uploads/d5b2677f-869b-4f23-ae7b-8f2ffdac0406.png",
        program: "Psychology",
        programType: "degree",
        website: "https://www.sfu.ca",
        province: "bc",
        admissionGPA: 3.3,
        admissionRate: 62,
        tuitionDomestic: 4800,
        tuitionInternational: 28000,
        placementRate: 80,
        averageIncome: 62000,
        programDuration: "4 years",
      },
      {
        name: "Langara College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Langara_College_logo.svg/1200px-Langara_College_logo.svg.png",
        program: "Web Development",
        programType: "diploma",
        website: "https://www.langara.ca",
        province: "bc",
        admissionGPA: 2.9,
        admissionRate: 72,
        tuitionDomestic: 2800,
        tuitionInternational: 14000,
        placementRate: 83,
        averageIncome: 62000,
        programDuration: "2 years",
      },
      {
        name: "Langara College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Langara_College_logo.svg/1200px-Langara_College_logo.svg.png",
        program: "Marketing Management",
        programType: "diploma",
        website: "https://www.langara.ca",
        province: "bc",
        admissionGPA: 2.7,
        admissionRate: 75,
        tuitionDomestic: 2500,
        tuitionInternational: 13500,
        placementRate: 80,
        averageIncome: 55000,
        programDuration: "2 years",
      },
      {
        name: "Vancouver Film School",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Vancouver_Film_School_logo.svg/1200px-Vancouver_Film_School_logo.svg.png",
        program: "3D Animation",
        programType: "certificate",
        website: "https://vfs.edu",
        province: "bc",
        admissionGPA: 3.0,
        admissionRate: 45,
        tuitionDomestic: 7500,
        tuitionInternational: 25000,
        placementRate: 85,
        averageIncome: 68000,
        programDuration: "1 year",
      },
      {
        name: "Vancouver Film School",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Vancouver_Film_School_logo.svg/1200px-Vancouver_Film_School_logo.svg.png",
        program: "Film Production",
        programType: "diploma",
        website: "https://vfs.edu",
        province: "bc",
        admissionGPA: 3.1,
        admissionRate: 40,
        tuitionDomestic: 9000,
        tuitionInternational: 29500,
        placementRate: 80,
        averageIncome: 65000,
        programDuration: "1 year",
      },

      // Ontario Schools
      {
        name: "University of Toronto",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.utoronto.ca",
        province: "on",
        admissionGPA: 3.8,
        admissionRate: 45,
        tuitionDomestic: 6800,
        tuitionInternational: 45000,
        placementRate: 94,
        averageIncome: 85000,
        programDuration: "4 years",
      },
      {
        name: "University of Toronto",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.utoronto.ca",
        province: "on",
        admissionGPA: 3.9,
        admissionRate: 40,
        tuitionDomestic: 7200,
        tuitionInternational: 48000,
        placementRate: 95,
        averageIncome: 90000,
        programDuration: "4 years",
      },
      {
        name: "University of Toronto",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
        program: "Medicine",
        programType: "degree",
        website: "https://www.utoronto.ca",
        province: "on",
        admissionGPA: 3.95,
        admissionRate: 10,
        tuitionDomestic: 9500,
        tuitionInternational: 65000,
        placementRate: 98,
        averageIncome: 150000,
        programDuration: "4 years",
      },
      {
        name: "University of Toronto",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/University_of_Toronto_seal.svg/1200px-University_of_Toronto_seal.svg.png",
        program: "Education",
        programType: "degree",
        website: "https://www.utoronto.ca",
        province: "on",
        admissionGPA: 3.5,
        admissionRate: 55,
        tuitionDomestic: 6000,
        tuitionInternational: 40000,
        placementRate: 90,
        averageIncome: 70000,
        programDuration: "2 years",
      },
      {
        name: "University of Waterloo",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png",
        program: "Software Engineering",
        programType: "degree",
        website: "https://uwaterloo.ca",
        province: "on",
        admissionGPA: 3.9,
        admissionRate: 35,
        tuitionDomestic: 8000,
        tuitionInternational: 55000,
        placementRate: 98,
        averageIncome: 95000,
        programDuration: "4 years",
      },
      {
        name: "University of Waterloo",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/University_of_Waterloo_seal.svg/1200px-University_of_Waterloo_seal.svg.png",
        program: "Mathematics",
        programType: "degree",
        website: "https://uwaterloo.ca",
        province: "on",
        admissionGPA: 3.8,
        admissionRate: 40,
        tuitionDomestic: 7500,
        tuitionInternational: 50000,
        placementRate: 95,
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
        admissionRate: 75,
        tuitionDomestic: 1800,
        tuitionInternational: 14000,
        placementRate: 82,
        averageIncome: 58000,
        programDuration: "1 year",
      },
      {
        name: "Algonquin College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Algonquin_College.svg/1200px-Algonquin_College.svg.png",
        program: "Business Marketing",
        programType: "diploma",
        website: "https://www.algonquincollege.com",
        province: "on",
        admissionGPA: 2.8,
        admissionRate: 80,
        tuitionDomestic: 2200,
        tuitionInternational: 15000,
        placementRate: 85,
        averageIncome: 55000,
        programDuration: "2 years",
      },
      {
        name: "Seneca College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Seneca_College_logo.svg/1200px-Seneca_College_logo.svg.png",
        program: "Computer Programming",
        programType: "diploma",
        website: "https://www.senecacollege.ca",
        province: "on",
        admissionGPA: 3.1,
        admissionRate: 70,
        tuitionDomestic: 2500,
        tuitionInternational: 16000,
        placementRate: 88,
        averageIncome: 65000,
        programDuration: "2 years",
      },
      {
        name: "Seneca College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Seneca_College_logo.svg/1200px-Seneca_College_logo.svg.png",
        program: "Graphic Design",
        programType: "diploma",
        website: "https://www.senecacollege.ca",
        province: "on",
        admissionGPA: 3.0,
        admissionRate: 65,
        tuitionDomestic: 2300,
        tuitionInternational: 15000,
        placementRate: 80,
        averageIncome: 55000,
        programDuration: "2 years",
      },

      // Quebec Schools
      {
        name: "McGill University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
        program: "Engineering",
        programType: "degree",
        website: "https://www.mcgill.ca",
        province: "qc",
        admissionGPA: 3.6,
        admissionRate: 48,
        tuitionDomestic: 4500,
        tuitionInternational: 38000,
        placementRate: 91,
        averageIncome: 82000,
        programDuration: "4 years",
      },
      {
        name: "McGill University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
        program: "Business Management",
        programType: "degree",
        website: "https://www.mcgill.ca",
        province: "qc",
        admissionGPA: 3.5,
        admissionRate: 50,
        tuitionDomestic: 4300,
        tuitionInternational: 36000,
        placementRate: 92,
        averageIncome: 80000,
        programDuration: "4 years",
      },
      {
        name: "McGill University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/1200px-McGill_University_CoA.svg.png",
        program: "Medicine",
        programType: "degree",
        website: "https://www.mcgill.ca",
        province: "qc",
        admissionGPA: 3.85,
        admissionRate: 15,
        tuitionDomestic: 7000,
        tuitionInternational: 45000,
        placementRate: 98,
        averageIncome: 160000,
        programDuration: "4 years",
      },
      {
        name: "Concordia University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Concordia_University_logo.svg/1200px-Concordia_University_logo.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.concordia.ca",
        province: "qc",
        admissionGPA: 3.2,
        admissionRate: 65,
        tuitionDomestic: 4000,
        tuitionInternational: 30000,
        placementRate: 85,
        averageIncome: 72000,
        programDuration: "4 years",
      },
      {
        name: "Concordia University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Concordia_University_logo.svg/1200px-Concordia_University_logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.concordia.ca",
        province: "qc",
        admissionGPA: 3.3,
        admissionRate: 60,
        tuitionDomestic: 4200,
        tuitionInternational: 32000,
        placementRate: 88,
        averageIncome: 75000,
        programDuration: "4 years",
      },
      {
        name: "Concordia University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Concordia_University_logo.svg/1200px-Concordia_University_logo.svg.png",
        program: "Fine Arts",
        programType: "degree",
        website: "https://www.concordia.ca",
        province: "qc",
        admissionGPA: 3.0,
        admissionRate: 50,
        tuitionDomestic: 3800,
        tuitionInternational: 28000,
        placementRate: 75,
        averageIncome: 60000,
        programDuration: "4 years",
      },
      {
        name: "Vanier College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vanier_College_logo.svg/1200px-Vanier_College_logo.svg.png",
        program: "Computer Science",
        programType: "diploma",
        website: "https://www.vaniercollege.qc.ca",
        province: "qc",
        admissionGPA: 3.0,
        admissionRate: 70,
        tuitionDomestic: 1500,
        tuitionInternational: 15000,
        placementRate: 80,
        averageIncome: 65000,
        programDuration: "3 years",
      },
      {
        name: "Vanier College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vanier_College_logo.svg/1200px-Vanier_College_logo.svg.png",
        program: "Nursing",
        programType: "diploma",
        website: "https://www.vaniercollege.qc.ca",
        province: "qc",
        admissionGPA: 3.2,
        admissionRate: 60,
        tuitionDomestic: 1800,
        tuitionInternational: 16000,
        placementRate: 95,
        averageIncome: 70000,
        programDuration: "3 years",
      },

      // Alberta Schools
      {
        name: "University of Alberta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Alberta_seal.svg/1200px-University_of_Alberta_seal.svg.png",
        program: "Education",
        programType: "degree",
        website: "https://www.ualberta.ca",
        province: "ab",
        admissionGPA: 3.4,
        admissionRate: 62,
        tuitionDomestic: 5200,
        tuitionInternational: 29000,
        placementRate: 85,
        averageIncome: 65000,
        programDuration: "4 years",
      },
      {
        name: "University of Alberta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Alberta_seal.svg/1200px-University_of_Alberta_seal.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.ualberta.ca",
        province: "ab",
        admissionGPA: 3.5,
        admissionRate: 60,
        tuitionDomestic: 5400,
        tuitionInternational: 30000,
        placementRate: 87,
        averageIncome: 78000,
        programDuration: "4 years",
      },
      {
        name: "University of Alberta",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/University_of_Alberta_seal.svg/1200px-University_of_Alberta_seal.svg.png",
        program: "Engineering",
        programType: "degree",
        website: "https://www.ualberta.ca",
        province: "ab",
        admissionGPA: 3.6,
        admissionRate: 55,
        tuitionDomestic: 5600,
        tuitionInternational: 32000,
        placementRate: 90,
        averageIncome: 85000,
        programDuration: "4 years",
      },
      {
        name: "University of Calgary",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/University_of_Calgary_Logo.svg/1200px-University_of_Calgary_Logo.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.ucalgary.ca",
        province: "ab",
        admissionGPA: 3.3,
        admissionRate: 65,
        tuitionDomestic: 5000,
        tuitionInternational: 28000,
        placementRate: 85,
        averageIncome: 75000,
        programDuration: "4 years",
      },
      {
        name: "University of Calgary",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/University_of_Calgary_Logo.svg/1200px-University_of_Calgary_Logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.ucalgary.ca",
        province: "ab",
        admissionGPA: 3.4,
        admissionRate: 60,
        tuitionDomestic: 5200,
        tuitionInternational: 29500,
        placementRate: 88,
        averageIncome: 80000,
        programDuration: "4 years",
      },
      {
        name: "NAIT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Northern_Alberta_Institute_of_Technology_Logo.svg/1200px-Northern_Alberta_Institute_of_Technology_Logo.svg.png",
        program: "Digital Media and IT",
        programType: "diploma",
        website: "https://www.nait.ca",
        province: "ab",
        admissionGPA: 2.9,
        admissionRate: 75,
        tuitionDomestic: 3200,
        tuitionInternational: 16000,
        placementRate: 88,
        averageIncome: 60000,
        programDuration: "2 years",
      },
      {
        name: "NAIT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Northern_Alberta_Institute_of_Technology_Logo.svg/1200px-Northern_Alberta_Institute_of_Technology_Logo.svg.png",
        program: "Business Administration",
        programType: "diploma",
        website: "https://www.nait.ca",
        province: "ab",
        admissionGPA: 2.7,
        admissionRate: 80,
        tuitionDomestic: 3000,
        tuitionInternational: 15500,
        placementRate: 85,
        averageIncome: 55000,
        programDuration: "2 years",
      },
      {
        name: "SAIT",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/SAIT_logo.svg/1200px-SAIT_logo.svg.png",
        program: "Information Technology",
        programType: "diploma",
        website: "https://www.sait.ca",
        province: "ab",
        admissionGPA: 3.0,
        admissionRate: 72,
        tuitionDomestic: 3300,
        tuitionInternational: 16500,
        placementRate: 89,
        averageIncome: 62000,
        programDuration: "2 years",
      },

      // Manitoba Schools
      {
        name: "University of Manitoba",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_of_Manitoba_logo.svg/1200px-University_of_Manitoba_logo.svg.png",
        program: "Commerce",
        programType: "degree",
        website: "https://www.umanitoba.ca",
        province: "mb",
        admissionGPA: 3.2,
        admissionRate: 68,
        tuitionDomestic: 4800,
        tuitionInternational: 25000,
        placementRate: 84,
        averageIncome: 70000,
        programDuration: "4 years",
      },
      {
        name: "University of Manitoba",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_of_Manitoba_logo.svg/1200px-University_of_Manitoba_logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.umanitoba.ca",
        province: "mb",
        admissionGPA: 3.3,
        admissionRate: 65,
        tuitionDomestic: 5000,
        tuitionInternational: 26000,
        placementRate: 86,
        averageIncome: 75000,
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
        admissionRate: 72,
        tuitionDomestic: 3800,
        tuitionInternational: 15000,
        placementRate: 86,
        averageIncome: 62000,
        programDuration: "2 years",
      },
      {
        name: "Red River College",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Red_River_College_Polytechnic_Logo.svg/1200px-Red_River_College_Polytechnic_Logo.svg.png",
        program: "Business Administration",
        programType: "diploma",
        website: "https://www.rrc.ca",
        province: "mb",
        admissionGPA: 2.8,
        admissionRate: 75,
        tuitionDomestic: 3500,
        tuitionInternational: 14500,
        placementRate: 83,
        averageIncome: 58000,
        programDuration: "2 years",
      },

      // Saskatchewan Schools
      {
        name: "University of Saskatchewan",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Saskatchewan_shield.svg/1200px-University_of_Saskatchewan_shield.svg.png",
        program: "Agriculture",
        programType: "degree",
        website: "https://www.usask.ca",
        province: "sk",
        admissionGPA: 3.3,
        admissionRate: 65,
        tuitionDomestic: 4800,
        tuitionInternational: 25000,
        placementRate: 88,
        averageIncome: 68000,
        programDuration: "4 years",
      },
      {
        name: "University of Saskatchewan",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/University_of_Saskatchewan_shield.svg/1200px-University_of_Saskatchewan_shield.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.usask.ca",
        province: "sk",
        admissionGPA: 3.4,
        admissionRate: 60,
        tuitionDomestic: 5000,
        tuitionInternational: 26000,
        placementRate: 85,
        averageIncome: 72000,
        programDuration: "4 years",
      },
      {
        name: "Saskatchewan Polytechnic",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Saskatchewan_Polytechnic_logo.svg/1200px-Saskatchewan_Polytechnic_logo.svg.png",
        program: "Business Certificate",
        programType: "certificate",
        website: "https://saskpolytech.ca",
        province: "sk",
        admissionGPA: 2.7,
        admissionRate: 82,
        tuitionDomestic: 1900,
        tuitionInternational: 12000,
        placementRate: 80,
        averageIncome: 53000,
        programDuration: "1 year",
      },
      {
        name: "Saskatchewan Polytechnic",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Saskatchewan_Polytechnic_logo.svg/1200px-Saskatchewan_Polytechnic_logo.svg.png",
        program: "Computer Engineering Technology",
        programType: "diploma",
        website: "https://saskpolytech.ca",
        province: "sk",
        admissionGPA: 2.9,
        admissionRate: 75,
        tuitionDomestic: 3200,
        tuitionInternational: 14500,
        placementRate: 85,
        averageIncome: 60000,
        programDuration: "2 years",
      },

      // Maritimes Schools
      {
        name: "Dalhousie University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dal_Logo.svg/1200px-Dal_Logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.dal.ca",
        province: "mt",
        admissionGPA: 3.5,
        admissionRate: 60,
        tuitionDomestic: 5200,
        tuitionInternational: 28000,
        placementRate: 88,
        averageIncome: 76000,
        programDuration: "4 years",
      },
      {
        name: "Dalhousie University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dal_Logo.svg/1200px-Dal_Logo.svg.png",
        program: "Business Management",
        programType: "degree",
        website: "https://www.dal.ca",
        province: "mt",
        admissionGPA: 3.3,
        admissionRate: 65,
        tuitionDomestic: 5000,
        tuitionInternational: 27000,
        placementRate: 85,
        averageIncome: 72000,
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
        admissionRate: 78,
        tuitionDomestic: 4100,
        tuitionInternational: 16000,
        placementRate: 84,
        averageIncome: 54000,
        programDuration: "2 years",
      },
      {
        name: "Nova Scotia Community College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/NSCC_Logo.svg/1200px-NSCC_Logo.svg.png",
        program: "Business Administration",
        programType: "diploma",
        website: "https://www.nscc.ca",
        province: "mt",
        admissionGPA: 2.9,
        admissionRate: 80,
        tuitionDomestic: 3800,
        tuitionInternational: 15000,
        placementRate: 82,
        averageIncome: 52000,
        programDuration: "2 years",
      },
      {
        name: "Saint Mary's University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Saint_Mary%27s_University_%28Halifax%29_Logo.svg/1200px-Saint_Mary%27s_University_%28Halifax%29_Logo.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.smu.ca",
        province: "mt",
        admissionGPA: 3.0,
        admissionRate: 70,
        tuitionDomestic: 4900,
        tuitionInternational: 20000,
        placementRate: 82,
        averageIncome: 65000,
        programDuration: "4 years",
      },
      {
        name: "University of New Brunswick",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/UNB_Shield.svg/1200px-UNB_Shield.svg.png",
        program: "Engineering",
        programType: "degree",
        website: "https://www.unb.ca",
        province: "mt",
        admissionGPA: 3.3,
        admissionRate: 65,
        tuitionDomestic: 5500,
        tuitionInternational: 18000,
        placementRate: 85,
        averageIncome: 78000,
        programDuration: "4 years",
      },

      // Remote Learning Options
      {
        name: "Athabasca University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Athabasca_University_logo.svg/1200px-Athabasca_University_logo.svg.png",
        program: "Business Administration",
        programType: "degree",
        website: "https://www.athabascau.ca",
        province: "remote",
        admissionGPA: 2.8,
        admissionRate: 85,
        tuitionDomestic: 3900,
        tuitionInternational: 3900,
        placementRate: 82,
        averageIncome: 68000,
        programDuration: "4 years",
      },
      {
        name: "Athabasca University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Athabasca_University_logo.svg/1200px-Athabasca_University_logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.athabascau.ca",
        province: "remote",
        admissionGPA: 2.9,
        admissionRate: 80,
        tuitionDomestic: 4100,
        tuitionInternational: 4100,
        placementRate: 80,
        averageIncome: 70000,
        programDuration: "4 years",
      },
      {
        name: "CDI College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/CDI_College_logo.svg/1200px-CDI_College_logo.svg.png",
        program: "Web Development",
        programType: "certificate",
        website: "https://www.cdicollege.ca",
        province: "remote",
        admissionGPA: 2.6,
        admissionRate: 88,
        tuitionDomestic: 1800,
        tuitionInternational: 1800,
        placementRate: 80,
        averageIncome: 55000,
        programDuration: "6 months",
      },
      {
        name: "CDI College",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/CDI_College_logo.svg/1200px-CDI_College_logo.svg.png",
        program: "Business Administration",
        programType: "diploma",
        website: "https://www.cdicollege.ca",
        province: "remote",
        admissionGPA: 2.5,
        admissionRate: 90,
        tuitionDomestic: 2000,
        tuitionInternational: 2000,
        placementRate: 78,
        averageIncome: 52000,
        programDuration: "1 year",
      },
      {
        name: "University of Phoenix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/University_of_Phoenix_Logo.svg/1200px-University_of_Phoenix_Logo.svg.png",
        program: "Business Management",
        programType: "degree",
        website: "https://www.phoenix.edu",
        province: "remote",
        admissionGPA: 2.5,
        admissionRate: 95,
        tuitionDomestic: 4500,
        tuitionInternational: 4500,
        placementRate: 75,
        averageIncome: 60000,
        programDuration: "4 years",
      },
      {
        name: "Southern New Hampshire University",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/SNHU_Shield_Logo.svg/1200px-SNHU_Shield_Logo.svg.png",
        program: "Computer Science",
        programType: "degree",
        website: "https://www.snhu.edu",
        province: "remote",
        admissionGPA: 2.7,
        admissionRate: 90,
        tuitionDomestic: 4200,
        tuitionInternational: 4200,
        placementRate: 78,
        averageIncome: 65000,
        programDuration: "4 years",
      }
    ];

    // Helper function to get related programs based on field
    const getRelatedPrograms = (field: string): string[] => {
      switch (field) {
        case "business":
          return ["Business", "Commerce", "Finance", "Marketing", "Management", "Business Administration", "Business Management", "Business Marketing"];
        case "computer-science":
          return ["Computer Science", "Software", "IT", "Computing", "Web Development", "Data Science", "Software Development", "Digital Media and IT", "Computer Programming", "IT Management", "Information Technology"];
        case "engineering":
          return ["Engineering", "Civil", "Mechanical", "Electrical", "Chemical", "Software Engineering"];
        case "medicine":
          return ["Medicine", "Health", "Nursing", "Pharmacy", "Medical", "Health Sciences"];
        case "arts":
          return ["Arts", "Humanities", "Design", "Fine Arts", "Music", "Digital Media", "Graphic Design", "3D Animation", "Film Production"];
        case "education":
          return ["Education", "Teaching", "Pedagogy"];
        case "law":
          return ["Law", "Legal Studies", "Justice"];
        case "agriculture":
          return ["Agriculture", "Farming", "Agribusiness"];
        case "culinary":
          return ["Culinary", "Food", "Cooking", "Culinary Arts", "Culinary Management"];
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

    // If no exact matches or very few matches, provide some results anyway for better user experience
    if (filteredSchools.length < 5) {
      let relaxedFilters = [...schools];
      
      // Keep the most important filter (field of study) if provided
      if (fieldOfStudy && fieldOfStudy !== "any") {
        const relatedPrograms = getRelatedPrograms(fieldOfStudy);
        relaxedFilters = relaxedFilters.filter(school => 
          relatedPrograms.length === 0 || relatedPrograms.some(program => 
            school.program.toLowerCase().includes(program.toLowerCase())
          )
        );
      }
      
      // If we have some results, keep them and add more relaxed results
      let combinedResults = [...filteredSchools];
      
      // Add relaxed results but avoid duplicates
      for (const school of relaxedFilters) {
        if (!combinedResults.some(s => s.name === school.name && s.program === school.program)) {
          combinedResults.push(school);
          if (combinedResults.length >= 15) break; // Cap at 15 schools
        }
      }
      
      filteredSchools = combinedResults;
      console.log(`Added relaxed matches, now providing ${filteredSchools.length} total results`);
    }

    // Randomize the order slightly to avoid showing the same results all the time
    filteredSchools = filteredSchools.sort(() => Math.random() - 0.5);
    
    // Limit the number of results to 20 to avoid overwhelming the user
    filteredSchools = filteredSchools.slice(0, 20);
    
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
