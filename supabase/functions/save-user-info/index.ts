
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

    // Insert user data with the admin client (bypassing RLS)
    // Use the exact column names from the database
    const { data, error } = await supabaseAdmin
      .from("Users")
      .insert([
        { 
          "User ID": userId, 
          "Display name": name,
          "Created at": new Date().toISOString(),
          "Location": location,
          "Field of Study": fieldOfStudy,
          "Budget": budget,
          "Duration": duration,
          "Payment Option": paymentOption
        }
      ])
      .select();
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({ success: true, data }),
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
