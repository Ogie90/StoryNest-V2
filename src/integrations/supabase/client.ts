import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://szmvwijybvnjrrjtonbm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bXZ3aWp5YnZuanJyanRvbmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzU2OTUsImV4cCI6MjA4ODU1MTY5NX0.ToPgVScrgxPBAvus4MUjpJpQV9yVniOkXsQdHpogBNI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
