
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

export const supabaseUrl = "https://pmkufhcvbozmcdlamogi.supabase.co"
const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta3VmaGN2Ym96bWNkbGFtb2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk4MDc3MTEsImV4cCI6MjAwNTM4MzcxMX0.VvD0CdP6y7mt6YHLUqbqvm2AeSvY7Qz87CcsI2z0_7Y");

export default supabase;