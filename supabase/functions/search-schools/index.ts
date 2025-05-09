
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
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      throw new Error('Missing Supabase environment variables')
    }
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Get request body
    const { fieldOfStudy, location, budget, programType } = await req.json()
    console.log(`Search criteria: field=${fieldOfStudy}, location=${location}, budget=${budget}, program=${programType}`)

    // Fetch all schools from the database - simplified query
    const { data: schools, error } = await supabase
      .from('School')
      .select('*')
    
    // Log database response for debugging
    console.log(`Database query response: schools count=${schools?.length || 0}, error=${error ? JSON.stringify(error) : 'none'}`)
    
    if (error) {
      console.error('Database error:', error)
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
    
    if (!schools || schools.length === 0) {
      console.log('No schools found in database, using defaults')
      return new Response(
        JSON.stringify({
          schools: DEFAULT_SCHOOLS,
          source: "default (no schools found)",
          message: "No schools found in database, using defaults"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }
    
    console.log(`Successfully retrieved ${schools.length} schools from database`)
    
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
        name: school.SchoolName || 'Unknown School',
        logo: school.ImageURL || '',
        program: "Various Programs", // Default program name
        programType: school.InstitutionType?.toLowerCase() || "degree",
        website: school.WebsiteURL || '#',
        province: school.Location?.toLowerCase() || "bc",
        admissionGPA: 3.5, // Default values if not in DB
        admissionRate: 60,
        tuitionDomestic: school.UndergraduateTuition || 5000,
        tuitionInternational: school.PostgraduateTuition || 20000,
        placementRate: school.GraduateEmployabilityScore || 85,
        averageIncome: 75000,
        // Additional fields
        schooId: school.SchoolID,
        imageURL: school.ImageURL,
        worldRanking: school.WorldRanking,
        graduateEmployabilityScore: school.GraduateEmployabilityScore,
        entranceDifficulty: school.EntranceDifficulty,
        institutionType: school.InstitutionType
      }
    })

    // Log mapped schools for debugging
    console.log(`Mapped ${mappedSchools.length} schools from database`)
    
    // Apply filters if specified - make filters more tolerant and handle null/undefined values
    let filteredSchools = mappedSchools
    
    // Filter by program type if specified and not 'any'
    if (programType && programType !== 'any') {
      filteredSchools = filteredSchools.filter(school => 
        school.programType && school.programType.toLowerCase().includes(programType.toLowerCase())
      )
      console.log(`After program type filter: ${filteredSchools.length} schools`)
    }

    // Filter by location if specified and not 'any'
    if (location && location !== 'any') {
      filteredSchools = filteredSchools.filter(school => 
        school.province && school.province.toLowerCase() === location.toLowerCase()
      )
      console.log(`After location filter: ${filteredSchools.length} schools`)
    }

    // Filter by budget range if specified and not 'any'
    if (budget && budget !== 'any') {
      filteredSchools = filteredSchools.filter(school => {
        let schoolBudgetRange = "any"
        const tuition = school.tuitionDomestic || 0
        if (tuition < 2000) schoolBudgetRange = "under-2k"
        else if (tuition < 5000) schoolBudgetRange = "2-5k"
        else if (tuition < 8000) schoolBudgetRange = "5-8k"
        else schoolBudgetRange = "8k-plus"
        
        return schoolBudgetRange === budget
      })
      console.log(`After budget filter: ${filteredSchools.length} schools`)
    }

    console.log(`Final schools count after all filters: ${filteredSchools.length}`)

    // If no schools found after filtering, return all schools without filtering
    if (filteredSchools.length === 0) {
      console.log('No matches with filters, returning all mapped schools')
      return new Response(
        JSON.stringify({
          schools: mappedSchools,
          source: "database (no filter matches - showing all)",
          message: "No matching schools found with your criteria, showing all schools"
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
        schoolCount: filteredSchools.length
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
