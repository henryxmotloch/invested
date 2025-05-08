
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
    // Create a Supabase client with the service role key which bypasses RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const { 
      name, 
      userId, 
      email = null,  // Add email here with default value
      location = null, 
      budget = null, 
      fieldOfStudy = null, 
      programType = null,  // Add programType here
      duration = null, 
      paymentOption = null
    } = await req.json();
    
    if (!name || !userId) {
      return new Response(
        JSON.stringify({ error: "Name and userId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Saving user data:", { name, userId, email, location, budget, fieldOfStudy, programType, duration, paymentOption });
    
    // First, let's log all available columns to help with debugging
    const { data: tableInfo, error: tableError } = await supabaseAdmin
      .from("Users")
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error("Error fetching table structure:", tableError);
    } else {
      console.log("Available columns:", tableInfo.length > 0 ? Object.keys(tableInfo[0]) : "No data available");
    }
    
    // Check if the user already exists
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from("Users")
      .select("*")
      .eq("User ID", userId)
      .maybeSingle();
    
    console.log("Existing user check:", { existingUser, fetchError });
    
    let result;
    
    if (existingUser) {
      // Update the existing user
      const updateData = {
        "Display name": name
      };
      
      // Only add fields if they have values
      if (email !== null) updateData["Email"] = email;
      if (location !== null) updateData["Preferred Campus Location"] = location;
      if (budget !== null) updateData["Budget Range"] = budget;
      if (fieldOfStudy !== null) updateData["Field of Study"] = fieldOfStudy;
      if (programType !== null) updateData["Program Type"] = programType;
      if (duration !== null) updateData["Study Duration"] = duration;
      if (paymentOption !== null) updateData["Payment Option"] = paymentOption;
      
      console.log("Updating user with data:", updateData);
      
      const { data, error } = await supabaseAdmin
        .from("Users")
        .update(updateData)
        .eq("User ID", userId)
        .select();
      
      if (error) {
        console.error("Error updating user:", error);
        throw error;
      }
      
      result = data;
      console.log("Updated existing user:", result);
    } else {
      // Insert a new user
      const insertData = {
        "User ID": userId,
        "Display name": name
      };
      
      // Only add fields if they have values
      if (email !== null) insertData["Email"] = email;
      if (location !== null) insertData["Preferred Campus Location"] = location;
      if (budget !== null) insertData["Budget Range"] = budget;
      if (fieldOfStudy !== null) insertData["Field of Study"] = fieldOfStudy;
      if (programType !== null) insertData["Program Type"] = programType;
      if (duration !== null) insertData["Study Duration"] = duration;
      if (paymentOption !== null) insertData["Payment Option"] = paymentOption;
      
      console.log("Inserting new user with data:", insertData);
      
      const { data, error } = await supabaseAdmin
        .from("Users")
        .insert(insertData)
        .select();
      
      if (error) {
        console.error("Error inserting user:", error);
        throw error;
      }
      
      result = data;
      console.log("Inserted new user:", result);
    }
    
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
