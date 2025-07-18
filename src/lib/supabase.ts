import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          skills: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          skills?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          skill_assessed: string
          score: number
          feedback_text: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_assessed: string
          score: number
          feedback_text: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_assessed?: string
          score?: number
          feedback_text?: string
          created_at?: string
        }
      }
    }
  }
}