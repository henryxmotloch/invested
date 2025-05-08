
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0"
import { corsHeaders } from "../_shared/cors.ts"
import { DEFAULT_SCHOOLS } from "../_shared/default-schools.ts"

console.log("search-schools function is running")

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') as string
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') as string
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Get request body
    const { fieldOfStudy, location, budget, programType } = await req.json()
    console.log(`Search criteria: field=${fieldOfStudy}, location=${location}, budget=${budget}, program=${programType}`)

    // Try to get schools from the database
    let { data: schools, error } = await supabase
      .from('School')
      .select('*')
      .eq('IsActive', true)
      
    if (error) {
      console.error('Database error:', error)
      // Fall back to default schools
      return new Response(
        JSON.stringify({
          schools: DEFAULT_SCHOOLS,
          source: "default",
          error: "Database error - using default schools"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }
    
    // Map school data from database to the expected format
    let mappedSchools = schools.map(school => {
      // Get budget range based on tuition
      let budgetRange = "any"
      const tuition = school.UndergraduateTuition || 0
      if (tuition < 2000) budgetRange = "under-2k"
      else if (tuition < 5000) budgetRange = "2-5k"
      else if (tuition < 8000) budgetRange = "5-8k"
      else budgetRange = "8k-plus"

      return {
        name: school.SchoolName,
        logo: school.ImageURL,
        program: "Various Programs", // Default program name
        programType: school.InstitutionType?.toLowerCase() || "degree",
        website: school.WebsiteURL,
        province: school.Location?.toLowerCase() || "bc",
        admissionGPA: 3.5, // Default values if not in DB
        admissionRate: 60,
        tuitionDomestic: school.UndergraduateTuition || 5000,
        tuitionInternational: school.PostgraduateTuition || 20000,
        placementRate: school.GraduateEmployabilityScore || 85,
        averageIncome: 75000,
        // Add the new fields
        schooId: school.SchoolID,
        imageURL: school.ImageURL,
        worldRanking: school.WorldRanking,
        graduateEmployabilityScore: school.GraduateEmployabilityScore,
        entranceDifficulty: school.EntranceDifficulty,
        institutionType: school.InstitutionType
      }
    })

    // Filter based on search criteria
    let filteredSchools = mappedSchools
    
    // Filter by program type
    if (programType && programType !== 'any') {
      filteredSchools = filteredSchools.filter(school => 
        school.programType.toLowerCase().includes(programType.toLowerCase())
      )
    }

    // Filter by location
    if (location && location !== 'any') {
      filteredSchools = filteredSchools.filter(school => 
        school.province.toLowerCase() === location.toLowerCase()
      )
    }

    // Filter by budget range
    if (budget && budget !== 'any') {
      filteredSchools = filteredSchools.filter(school => {
        let schoolBudgetRange = "any"
        const tuition = school.tuitionDomestic
        if (tuition < 2000) schoolBudgetRange = "under-2k"
        else if (tuition < 5000) schoolBudgetRange = "2-5k"
        else if (tuition < 8000) schoolBudgetRange = "5-8k"
        else schoolBudgetRange = "8k-plus"
        
        return schoolBudgetRange === budget
      })
    }

    console.log(`Found ${filteredSchools.length} schools after filtering`)

    // If no schools found after filtering, return default schools
    if (filteredSchools.length === 0) {
      return new Response(
        JSON.stringify({
          schools: DEFAULT_SCHOOLS,
          source: "default (no matches)",
          message: "No matching schools found in database, using defaults"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    return new Response(
      JSON.stringify({
        schools: filteredSchools,
        source: "database",
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    console.error('Error in search-schools function:', error)
    
    return new Response(
      JSON.stringify({
        schools: DEFAULT_SCHOOLS,
        source: "default (error)",
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
