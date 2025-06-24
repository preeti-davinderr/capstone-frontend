// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://loqjctqlroqrvxfoqdjr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvcWpjdHFscm9xcnZ4Zm9xZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0Njc1NDksImV4cCI6MjA2NjA0MzU0OX0.CN5bimrvCRIJYWRCCs5rkJzZta5-GF6OlMoP86MCbLU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
