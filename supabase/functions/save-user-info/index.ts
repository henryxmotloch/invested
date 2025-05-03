
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
      location = null, 
      budget = null, 
      fieldOfStudy = null, 
      duration = null, 
      paymentOption = null
    } = await req.json();
    
    if (!name || !userId) {
      return new Response(
        JSON.stringify({ error: "Name and userId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Saving user data:", { name, userId, location, budget, fieldOfStudy, duration, paymentOption });
    
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
      if (location) updateData["Location"] = location;
      if (budget) updateData["Budget"] = budget;
      if (fieldOfStudy) updateData["Field of Study"] = fieldOfStudy;
      if (duration) updateData["Duration"] = duration;
      if (paymentOption) updateData["Payment Option"] = paymentOption;
      
      const { data, error } = await supabaseAdmin
        .from("Users")
        .update(updateData)
        .eq("User ID", userId)
        .select();
        
      if (error) throw error;
      result = data;
      console.log("Updated existing user:", result);
    } else {
      // Insert a new user
      const insertData = {
        "User ID": userId,
        "Display name": name
      };
      
      // Only add fields if they have values
      if (location) insertData["Location"] = location;
      if (budget) insertData["Budget"] = budget;
      if (fieldOfStudy) insertData["Field of Study"] = fieldOfStudy;
      if (duration) insertData["Duration"] = duration;
      if (paymentOption) insertData["Payment Option"] = paymentOption;
      
      const { data, error } = await supabaseAdmin
        .from("Users")
        .insert(insertData)
        .select();
        
      if (error) throw error;
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
