export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          auth_id: string
          email: string
          name: string | null
          role: 'ARTIST' | 'CLIENT' | 'STUDIO' | 'ADMIN'
          email_verified: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          name?: string | null
          role: 'ARTIST' | 'CLIENT' | 'STUDIO' | 'ADMIN'
          email_verified?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string
          email?: string
          name?: string | null
          role?: 'ARTIST' | 'CLIENT' | 'STUDIO' | 'ADMIN'
          email_verified?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      artists: {
        Row: {
          id: string
          user_id: string
          bio: string | null
          specialties: string[]
          experience: number | null
          hourly_rate: number | null
          portfolio_images: string[]
          studio_id: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string | null
          specialties?: string[]
          experience?: number | null
          hourly_rate?: number | null
          portfolio_images?: string[]
          studio_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string | null
          specialties?: string[]
          experience?: number | null
          hourly_rate?: number | null
          portfolio_images?: string[]
          studio_id?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          phone: string | null
          birth_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phone?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phone?: string | null
          birth_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string
          artist_id: string
          date: string
          duration: number
          status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          tattoo_style: string | null
          description: string | null
          reference_images: string[]
          estimated_price: number | null
          deposit: number | null
          deposit_paid: boolean
          notes: string | null
          cancellation_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          artist_id: string
          date: string
          duration: number
          status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          tattoo_style?: string | null
          description?: string | null
          reference_images?: string[]
          estimated_price?: number | null
          deposit?: number | null
          deposit_paid?: boolean
          notes?: string | null
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          artist_id?: string
          date?: string
          duration?: number
          status?: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          tattoo_style?: string | null
          description?: string | null
          reference_images?: string[]
          estimated_price?: number | null
          deposit?: number | null
          deposit_paid?: boolean
          notes?: string | null
          cancellation_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'ARTIST' | 'CLIENT' | 'STUDIO' | 'ADMIN'
      appointment_status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
    }
  }
}
